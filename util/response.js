exports.setResponseHeadersCORS = function(response) {
    response.headers = {
        "X-Requested-With": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
    };
};