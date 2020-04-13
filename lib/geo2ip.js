'use strict';

const redisClient = require('../redis/redis-client');
const util = require('util');

exports.lookup = async (lon, lat, radius) => {
    const args = [process.env.GEO2IP_KEYSPACE, lon, lat, radius, "m"];
    const redisClientSendCommand = util.promisify(redisClient.send_command).bind(redisClient);
    try {
        return await redisClientSendCommand('GEORADIUS', args);
    }
    catch(err){
        const error = new Error( `No ip data for lon = ${lon} lat = ${lat} radius = ${radius}`);
        error.code = 400;
        throw error;
    }
};



