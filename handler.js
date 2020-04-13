'use strict';

const validate = require('./lib/validate');
const authorize = require('./lib/authorize');
const rateLimiter = require('./lib/rateLimiter');
const geo2ip  = require('./lib/geo2ip');
const requestUtility  = require('./util/request');
const responseUtility  = require('./util/response');

module.exports.lookup = (event, context) => {
    return new Promise((resolve, reject) => {
        const start = new Date();
        const payload = {};
        const request = {};
        const response = {};
        let {lon, lat, radius, key} = event.queryStringParameters || {};

        requestUtility.enrichRequest(request, event, context);
        responseUtility.setResponseHeadersCORS(response);   // enable CORS in api gateway when using lambda proxy integration

        Promise.all([validate.longitude(lon), validate.latitude(lat), validate.radius(radius), validate.key(key) ])
            .then(([longitudeResult, latitudeResult, radiusResult, keyResult]) =>{
                return authorize.key(key);})
            .then( (authorizeResult) =>{
                return rateLimiter.limit(key, authorizeResult, response);})
            .then(() =>{
                return geo2ip.lookup(lon, lat, radius);})
            .then((ips) => {
                createSuccessResponse(request, response, payload, lon, lat, radius, ips, start);
            })
            .catch((error) => {
                console.error(`handler.lookup - error returned from promise chain: ${error}`);
                createErrorResponse(request, response, payload, error, start);
            })
            .then(() => {
                payload.key = key;  // we want the api key in the logs
                console.log(JSON.stringify(payload));   // cloudwatch logging of every response
                resolve(response);
            });
    });
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


function createSuccessResponse(request, response, payload, lon, lat, radius, ips, start){
    payload.status = "success";
    payload.status_code = 200;
    payload.time_elapsed = new Date() - start;
    payload.request = request;
    payload.lon = Number(lon);
    payload.lat = Number(lat);
    payload.radius = Number(radius);
    payload.ips = ips;

    response.statusCode = 200;
    response.body = JSON.stringify(payload);
}


