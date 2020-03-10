'use strict';

const redisClient = require('../redis/redis-client');
const limiter = require('ratelimiter');

exports.limit = function (key, authorizationResults, response){
    return new Promise((resolve, reject) => {
        let limit = new limiter({
            id: key,
            db: redisClient,
            max: authorizationResults.ratelimit_max,
            duration: authorizationResults.ratelimit_duration
        });

        limit.get(function(error, limit) {
            if (error){
                console.log("ratelimit.limit error: " + error);
                resolve(null); // this error is unfortunate, but not fatal
            }
            else{
                response.headers["X-RateLimit-Limit"] = limit.total;
                response.headers["X-RateLimit-Remaining"] = limit.remaining-1;

                if (!limit.remaining){
                    let delta = (limit.reset * 1000) - Date.now() | 0;
                    response.headers["Retry-After"] = delta;
                    let error = new Error();
                    error.message = "Rate limit exceeded, retry in " + delta + " ms";
                    error.code = 429;
                    reject(error);
                }
                resolve(null);
            }
        });
    });
}