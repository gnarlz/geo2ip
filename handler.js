'use strict';

const validate = require('./lib/validate');
const authorize = require('./lib/authorize');
const ratelimit = require('./lib/ratelimit');
const geo2ip  = require('./lib/geo2ip');
const moment = require('moment');


module.exports.lookup = (event, context) => {

    return new Promise((resolve, reject) => {
        context.callbackWaitsForEmptyEventLoop = false;

        const start = new Date();
        const payload = {};
        const request = {};
        const response = {};
        let {lon, lat, radius, key} = event.queryStringParameters || {};

        enrichRequest(request, event, context);
        setResponseHeadersCORS(response);   // enable CORS in api gateway when using lambda proxy integration

        Promise.all([validate.longitude(lon), validate.latitude(lat), validate.radius(radius), validate.key(key), authorize.key(key) ])
            .then((result) =>{
                return ratelimit.limit(key, result[4], response);})
            .then((result) =>{
                return geo2ip.lookup(lon, lat, radius);})
            .then((result) => {
                createSuccessResponse(request, response, payload, result, start);
            })
            .catch((error) => {
                console.error("handler.lookup - error returned from promise chain: " + error);
                createErrorResponse(request, response, payload, error, start);
            })
            .then((result) => {
                payload.key = key;  // we want the api key in the logs
                console.log(JSON.stringify(payload));
                resolve(response);
            });
    });
}




function enrichRequest(request, event, context){
    request.request_id = context.awsRequestId;
    request.request_ts = moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS');
    request.source_ip = event['requestContext']['identity']['sourceIp'];
    request.is_desktop = (event['headers']['CloudFront-Is-Desktop-Viewer'] === "true");
    request.is_mobile = (event['headers']['CloudFront-Is-Mobile-Viewer'] === "true");
    request.is_smart_tv = (event['headers']['CloudFront-Is-SmartTV-Viewer'] === "true");
    request.is_tablet = (event['headers']['CloudFront-Is-Tablet-Viewer'] === "true");
    request.viewer_country = event['headers']['CloudFront-Viewer-Country'];
    request.accept_language = event['headers']['Accept-Language'];
    request.origin = event['headers']['origin'];
    request.referer = event['headers']['Referer'];
    request.user_agent = event['headers']['User-Agent'];
}

function setResponseHeadersCORS(response){
    response.headers = {
        "X-Requested-With": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
    };
}

function createErrorResponse(request, response, payload, err, start){
    payload.status = "error";
    payload.status_code = err.code;
    payload.time_elapsed = new Date() - start;
    payload.request = request;
    payload.error = {message: err.message};

    response.statusCode = err.code;
    response.body = JSON.stringify(payload);
}


function createSuccessResponse(request, response, payload, results, start){
    payload.status = "success";
    payload.status_code = 200;
    payload.time_elapsed = new Date() - start;
    payload.request = request;
    payload.lon = results.lon;
    payload.lat = results.lat;
    payload.radius = results.radius;
    payload.ips = results.ips;

    response.statusCode = 200;
    response.body = JSON.stringify(payload);
}


