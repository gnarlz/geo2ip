'use strict';

const redisClient = require('../../redis/redis-client');
const util = require('util');

exports.run = function() {

        Promise.all([
            setValidKey(), setRevokedKey(), setExceededPlanLimitKey(),setExceededRateLimitKey(),
            setPaymentPastDueKey(), setAccountTerminatedKey(), setFreeTrialEndedKey(), loadLocationData() ])


        .then((result) =>{
            console.log("setup.run - completed successfully");
        })
        .catch((error) => {
            console.error("setup.run - error: " + error);
        })


}



function setValidKey(){
    return new Promise((resolve, reject) => {
        const redisClientSendCommand = util.promisify(redisClient.send_command).bind(redisClient);
        let args = ["authorized:"+ process.env.VALID_KEY,
            '{"authorized":true,"message":"Reset key.request.total","ts":"2019-10-19 12:01:32.818000",' +
            '"ratelimit_max":5,"ratelimit_duration":60000}'];
        redisClientSendCommand('SET', args)
            .catch((error) => {
                console.error("redis error: " + JSON.stringify(error));
            })
    });
}

function setRevokedKey(){
    return new Promise((resolve, reject) => {
        const redisClientSendCommand = util.promisify(redisClient.send_command).bind(redisClient);
        let args = ["authorized:"+ process.env.REVOKED_KEY,
            '{"authorized":false,"message":"Your API key has been revoked due to abuse. ' +
            'Please contact support@ip2geo.co to resolve this issue.","ts":"2019-09-06 14:02:38.595000"}'];
        redisClientSendCommand('SET', args)
            .catch((error) => {
                console.error("redis error: " + JSON.stringify(error));
            })
    });
}

function setExceededPlanLimitKey(){
    return new Promise((resolve, reject) => {
        const redisClientSendCommand = util.promisify(redisClient.send_command).bind(redisClient);
        let args = ["authorized:"+ process.env.EXCEEDED_PLAN_LIMIT_KEY,
            '{"authorized":false,"message":"Your API key has been suspended because you have exceeded your plans ' +
            'monthly request limit. Please contact support@ip2geo.co to resolve this issue.","ts":"2019-09-07 10:25:23.984000"}'];
        redisClientSendCommand('SET', args)
            .catch((error) => {
                console.error("redis error: " + JSON.stringify(error));
            })
    });
}

function setExceededRateLimitKey(){
    return new Promise((resolve, reject) => {
        const redisClientSendCommand = util.promisify(redisClient.send_command).bind(redisClient);
        let args = ["authorized:"+ process.env.EXCEEDED_RATE_LIMIT_KEY,
            '{"authorized":false,"message":"Your API key has been suspended because you have exceeded the rate limit. ' +
            'Please contact support@ip2geo.co to resolve this issue.","ts":"2019-09-06 14:05:50.768000"}'];
        redisClientSendCommand('SET', args)
            .catch((error) => {
                console.error("redis error: " + JSON.stringify(error));
            })
    });
}

function setPaymentPastDueKey(){
    return new Promise((resolve, reject) => {
        const redisClientSendCommand = util.promisify(redisClient.send_command).bind(redisClient);
        let args = ["authorized:"+ process.env.PAYMENT_PAST_DUE__KEY,
            '{"authorized":false,"message":"Your API key has been suspended because your account payment is past due. ' +
            'Please contact support@ip2geo.co to resolve this issue.","ts":"2019-09-06 14:06:53.492000"}'
        ];
        redisClientSendCommand('SET', args)
            .catch((error) => {
                console.error("redis error: " + JSON.stringify(error));
            })
    });
}

function setAccountTerminatedKey(){
    return new Promise((resolve, reject) => {
        const redisClientSendCommand = util.promisify(redisClient.send_command).bind(redisClient);
        let args = ["authorized:"+ process.env.ACCOUNT_TERMINATED__KEY,
            '{"authorized":false,"message":"Your API key has been suspended because your account has been terminated. ' +
            'Please contact support@ip2geo.co to resolve this issue.","ts":"2019-09-06 14:07:02.190000"}'
        ];
        redisClientSendCommand('SET', args)
            .catch((error) => {
                console.error("redis error: " + JSON.stringify(error));
            })
    });
}

function setFreeTrialEndedKey(){
    return new Promise((resolve, reject) => {
        const redisClientSendCommand = util.promisify(redisClient.send_command).bind(redisClient);
        let args = ["authorized:"+ process.env.FREE_TRIAL_ENDED_KEY,
            '{"authorized":false,"message":"Your API key has been suspended because your free trial has ended. ' +
            'Please contact support@ip2geo.co to resolve this issue.","ts":"2019-09-06 14:07:09.790000"}'
        ];
        redisClientSendCommand('SET', args)
            .catch((error) => {
                console.error("redis error: " + JSON.stringify(error));
            })
    });
}

function loadLocationData(){
    return new Promise((resolve, reject) => {
        const redisClientSendCommand = util.promisify(redisClient.send_command).bind(redisClient);

        let args = [];
        args[0] = [process.env.GEO2IP_KEYSPACE, -89.644273, 43.110954, "137.27.69.208/30" ];
        args[1] = [process.env.GEO2IP_KEYSPACE, -89.644273, 43.110954, "137.27.69.228/30" ];
        args[2] = [process.env.GEO2IP_KEYSPACE, -89.644273, 43.110954, "137.27.69.232/29" ];
        args[3] = [process.env.GEO2IP_KEYSPACE, -89.644273, 43.110954, "137.27.69.248/30" ];
        args[4] = [process.env.GEO2IP_KEYSPACE, -89.644273, 43.110954, "159.189.73.0/25" ];

        Promise.all([
            redisClientSendCommand('GEOADD', args[0]), redisClientSendCommand('GEOADD', args[1]),
            redisClientSendCommand('GEOADD', args[2]), redisClientSendCommand('GEOADD', args[3]),
            redisClientSendCommand('GEOADD', args[4]), ])
            .then((result) =>{
                console.log("redis GEOADD - all completed successfully");
            })
            .catch((error) => {
                console.error("redis GEOADD - error: " + error);
            })
    });
}

function verify(){
    const redisClientSendCommand = util.promisify(redisClient.send_command).bind(redisClient);
    redisClientSendCommand('GET', "authorized:c0ee3250-6a73-11e9-9ee1-f528bffeceb6")
        .then((results) => {
            console.log("redis keys * results: " + results);
        })
        .catch((error) => {
            console.error("redis keys * error: " + error);
        })
}