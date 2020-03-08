'use strict';

const redis = require('redis');
const redis_mock = require("redis-mock");

let client;

if(!process.env.MODE){
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

    client = redis_mock.createClient();
    client.on('connect', function() {
        console.log("mock redis client - connected");
    });
    client.on('error', function (err) {
        console.error("mock redis client - error:" + err);
    });
}



// localhost
/*
client = redis.createClient({});
client.on('connect', function() {
    console.log("localhost redis client - connected");
});
client.on('error', function (err) {
    console.error("localhost redis client - error:" + err);
});
*/

module.exports = client;
