'use strict';

const redisClient = require('../redis/redis-client');
const util = require('util');

exports.key = async (key) => {

    let akey = "authorized:" + key;
    let args = [akey];
    const redisClientSendCommand = util.promisify(redisClient.send_command).bind(redisClient);

    try{
        const results = await redisClientSendCommand('GET', args);
        if (results) {
            // redis reply for valid key with rate limiting:
            //{"authorized":true, "message":"Account creation", "ts":"2019-11-22 11:13:29.607000", "ratelimit_max":60,"ratelimit_duration":60000}
            let data = JSON.parse(results);

            if(data.authorized === true) {
                return data;
            }
            else if (data.authorized  === false){
                console.error(`authorize.key - Unauthorized API key returned from Redis :       key: ${key}     redis reply: ${results}`);
                const error = new Error(data.message);
                error.code = 403;
                throw error;
            }
            else{
                console.error(`authorize.key - garbage redis reply:       key: ${key}     redis reply: ${results}`);
                const error = new Error('Internal server error');
                error.code = 500;
                throw  error;
            }

        } else {   //key doesnt exist in redis, null is returned
            console.error(`authorize.key - API key unrecognized (not found in Redis):       key: ${key}     redis reply: ${results}`);
            const error = new Error(`API Key is unrecognized: ${key}`);
            error.code = 401;
            throw error;
        }
    }
    catch(error){
        throw  error;
    }
};

