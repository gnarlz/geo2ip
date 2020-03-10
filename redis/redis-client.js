'use strict';

const redis = require('redis');

let client;

if(process.env.REDIS_PORT){
    client = redis.createClient({
        port      : process.env.REDIS_PORT,
        host      : process.env.REDIS_IP_ADDRESS,
        password  : process.env.REDIS_PASS
    });
    client.on('connect', function() {
        console.log("redis client - connected");
    });
    client.on('error', function (err) {
        console.error("redis client - error:" + err);
    });
} else {
    client = redis.createClient({});
    client.on('connect', function() {
        console.log("localhost redis client - connected");
    });
    client.on('error', function (err) {
        console.error("localhost redis client - error:" + err);
    });
}

module.exports = client;
