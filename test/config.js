'use strict'

const config = require('./config.json');
const setup = require('./lib/setup');

if(!process.env.MODE) {

    process.env.MODE = config.MODE;
    process.env.VALID_KEY = config.VALID_KEY;
    process.env.REVOKED_KEY =config.REVOKED_KEY;
    process.env.EXCEEDED_PLAN_LIMIT_KEY = config.EXCEEDED_PLAN_LIMIT_KEY;
    process.env.EXCEEDED_RATE_LIMIT_KEY = config.EXCEEDED_RATE_LIMIT_KEY;
    process.env.PAYMENT_PAST_DUE__KEY = config.PAYMENT_PAST_DUE__KEY;
    process.env.ACCOUNT_TERMINATED__KEY = config.ACCOUNT_TERMINATED__KEY;
    process.env.FREE_TRIAL_ENDED_KEY = config.FREE_TRIAL_ENDED_KEY;
    process.env.VALID_LON = config.VALID_LON;
    process.env.VALID_LAT = config.VALID_LAT;
    process.env.VALID_RADIUS = config.VALID_RADIUS;
    process.env.SOURCE_IP = config.SOURCE_IP;
    process.env.GEO2IP_KEYSPACE = config.GEO2IP_KEYSPACE;

    console.log("valid API key for this test: " + process.env.VALID_KEY);
    console.log("revoked API key for this test: " + process.env.REVOKED_KEY);
    console.log("exceeded plan limit API key for this test: " + process.env.EXCEEDED_PLAN_LIMIT_KEY);
    console.log("exceeded rate limit API key for this test: " + process.env.EXCEEDED_RATE_LIMIT_KEY);
    console.log("payment past due API key for this test: " + process.env.PAYMENT_PAST_DUE__KEY);
    console.log("account terminated API key for this test: " + process.env.ACCOUNT_TERMINATED__KEY);
    console.log("free trial ended API key for this test: " + process.env.FREE_TRIAL_ENDED_KEY );
    console.log("valid longitude for this test: " + process.env.VALID_LON);
    console.log("valid latitude for this test: " + process.env.VALID_LAT);
    console.log("valid radius for this test: " + process.env.VALID_RADIUS);
    console.log("source IP for this test: " + process.env.SOURCE_IP);
    console.log("geo2ip redis keyspace for this test: " + process.env.GEO2IP_KEYSPACE);

    setup.run();
}
