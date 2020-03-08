'use strict';

const redisClient = require('../redis/redis-client');
const util = require('util');
const limiter = require('ratelimiter');


exports.key = function(key) {

    return new Promise((resolve, reject) => {
        let akey = "authorized:" + key;
        let authorized;
        let message;
        let ratelimit_max;
        let ratelimit_duration;
        let error;

        let args = [akey];
        const redisClientSendCommand = util.promisify(redisClient.send_command).bind(redisClient);
        redisClientSendCommand('GET', args)
            .then((results) => {

                console.log("redis results: "  + JSON.stringify(results));
                if (results) {
                    // sample redis reply
                    //{"authorized":true, "message":"Account creation", "ts":"2019-11-22 11:13:29.607000", "ratelimit_max":60,"ratelimit_duration":60000}

                    let data = JSON.parse(results);
                    authorized = data.authorized; // boolean
                    message = data.message;
                    ratelimit_max = data.ratelimit_max;
                    ratelimit_duration = data.ratelimit_duration;

                    if(authorized === true) {

                        // TODO: bring back rate limiting
                        // rate limiting for Free plan subscribers
                        //if(ratelimit_max){
                        //    applyRateLimiting(key, ratelimit_max, ratelimit_duration, callback);
                        // }
                        //else{
                        //    callback(null);
                        //}

                        resolve(null);
                    }
                    else if (authorized === false){
                        console.error("authorize.key - Unauthorized API key returned from Redis :       key: " + akey + "     redis reply: " + results);
                        error = new Error();
                        error.message = message;
                        error.code = 403;
                        reject(error);
                    }
                    else{
                        console.error("authorize.key - garbage redis reply :       key: " + akey + "     redis reply: " + results);
                        error = new Error();
                        error.message = "Internal server error";
                        error.code = 500;
                        reject(error);
                    }

                } else {   //key doesnt exist in redis, null is returned
                    console.error("authorize.key - API key unrecognized (not found in Redis):       key: " + akey + "     redis reply: " + results);
                    error = new Error();
                    error.message = "API Key is unrecognized: " + key;
                    error.code = 401;
                    reject(error);
                }

            })
            .catch((error) => {
                console.error("authorize.key - redis error attempting to authorize key: " + akey + "        error: " + error) ;
                reject(error);
            });

    });

};


function applyRateLimiting(key, ratelimit_max, ratelimit_duration, callback){
    let limit = new Limiter({
        id: key,
        db: redis_client,
        max: ratelimit_max,
        duration: ratelimit_duration
    });

    limit.get(function(err, limit) {
        if (err){
            console.log("rate limiter error: " + err);
            //intentionally drop error on floor - this error is unfortunate, but not fatal
            callback(null);
        }
        else{
            const ratelimit = {};
            ratelimit.total = limit.total;
            ratelimit.remaining = limit.remaining;

            if(Number(limit.remaining) <= 0){
                let delta = (limit.reset * 1000) - Date.now() | 0;
                let error = new Error();
                error.message = "Rate limit exceeded, retry in " + delta + " ms";
                error.code = 429;
                error.limit = limit.total;
                error.remaining = limit.remaining;
                error.retry = (limit.reset * 1000);
                callback(error);
            }
            else{
                callback(null, JSON.stringify(ratelimit));
            }
        }
    });
}