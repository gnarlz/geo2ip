'use strict';

const redisClient = require('../redis/redis-client');
const RateLimiter = require('ratelimiter');
const util = require('util');

exports.limit = async (key, authorizationResults, response) => {

        if(!authorizationResults.ratelimit_max){
            return null;
        }
        const rateLimiterConfig =  {
            id: key,
            db: redisClient,
            max: authorizationResults.ratelimit_max,
            duration: authorizationResults.ratelimit_duration
        };
        const limiter = new RateLimiter(rateLimiterConfig);

        try{
            const limiterGet = util.promisify(limiter.get).bind(limiter);
            const limit =  await limiterGet();
            if(limit){
                if(!response.headers){
                    response.headers = {};
                }
                response.headers["X-RateLimit-Limit"] = limit.total;
                response.headers["X-RateLimit-Remaining"] = limit.remaining-1;
                console.log("limit: " + JSON.stringify(limit));
                if (!limit.remaining){
                    const delta = (limit.reset * 1000) - Date.now() | 0;
                    response.headers["Retry-After"] = delta;
                    const error = new Error();
                    error.message = "Rate limit exceeded, retry in " + delta + " ms";
                    error.code = 429;
                   throw error;
                }
               return null;
            }
        }
        catch(error){
            throw error;
        }
};