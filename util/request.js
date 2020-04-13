'use strict';

const moment = require('moment');

exports.enrichRequest = function(request, event, context) {
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
};