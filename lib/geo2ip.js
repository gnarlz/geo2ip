'use strict';

const redisClient = require('../redis/redis-client');
const util = require('util');

exports.lookup = function(lon, lat, radius) {

    return new Promise((resolve, reject) => {
        let error;
        const payload = {};
        let args = [process.env.GEO2IP_KEYSPACE, lon, lat, radius, "m"];
        const redisClientSendCommand = util.promisify(redisClient.send_command).bind(redisClient);
        redisClientSendCommand('GEORADIUS', args)
            .then((results) => {
                if (results[0]) {
                    payload.lon = Number(lon);
                    payload.lat = Number(lat);
                    payload.radius = Number(radius);
                    payload.ips = results;
                    resolve(payload);
                } else {
                    error = new Error();
                    error.message = "no ip data for lon = " + lon + " lat = " + lat + " radius = " + radius;
                    error.code = 400;
                    console.error(error.message);
                    reject(error);
                }
            })
            .catch((error) => {
                error = new Error();
                error.message = "No ip data for lon = " + lon + " lat = " + lat + " radius = " + radius;
                error.code = 400;
                console.error(error.message);
                reject(error);
            });
    });
};

/*
lookup( 139.6444, 35.5569, 1000)
//lookup( -0.12455, 61.5007, 1000) // no data returned
    .then((payload) => {
        console.log("payload: " + JSON.stringify(payload));
    })
    .catch((error) => {
        console.error("error: " + error);
    });

*/

