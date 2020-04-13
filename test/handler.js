'use strict'

const config = require('./config');
const expect  = require("chai").expect;
const handler = require('../handler');
const { v4: uuidv4 } = require('uuid');

describe('handler.lookup',() => {


    /*
    ==========================================================================================
    =========================================  TESTS =========================================
    ==========================================================================================

     no key parameter in query string
     empty key parameter in query string
     invalid key parameter in query string (key "foo" not uuid)
     invalid key parameter in query string (key uuid not in redis)
     unauthorized key parameter in query string (key in redis with authorized == false)

     no lon parameter in query string
     empty lon parameter in query string
     invalid lon parameter (i.e. foo) in query string
     invalid lon parameter (i.e. 333) in query string

     no lat parameter in query string
     empty lat parameter in query string
     invalid lat parameter (i.e. foo) in query string
     invalid lat parameter (i.e. 333) in query string

    no radius parameter in query string
    empty radius parameter in query string
    invalid radius parameter (i.e. foo) in query string
    invalid radius parameter (i.e. 3000) in query string

    valid lon, lat, radius parameters in query string
    */


    // ====================================================================================
    // =======================================  KEY =======================================
    // ====================================================================================

    it('no key parameter in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "lon": process.env.VALID_LON, "lat": process.env.VALID_LAT, "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("No API Key included in the request");
            });
    });

    it('empty key parameter in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": "", "lon": process.env.VALID_LON, "lat": process.env.VALID_LAT, "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("No API Key included in the request");
            });
    });

    it('invalid key parameter ("foo") in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": "foo", "lon": process.env.VALID_LON, "lat": process.env.VALID_LAT, "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("Invalid API Key included in the request: foo");
            });
    });

    it('invalid key parameter (uuid) in query string should return statusCode 401 and fully formed error response', () => {
        const uuid = uuidv4();
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": uuid, "lon": process.env.VALID_LON, "lat": process.env.VALID_LAT, "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(401);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(401);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("API Key is unrecognized: " + uuid);
            });
    });

    it('revoked key parameter (uuid) in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.REVOKED_KEY, "lon": process.env.VALID_LON, "lat": process.env.VALID_LAT, "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(403);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(403);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("Your API key has been revoked due to abuse. Please contact support@ip2geo.co to resolve this issue.");
            });
    });


    // ====================================================================================
    // =======================================  LON =======================================
    // ====================================================================================

    it('no lon parameter in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.VALID_KEY,  "lat": process.env.VALID_LAT, "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("No longitude included in the request");
            });
    });

    it('empty lon parameter in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.VALID_KEY,  "lon": "", "lat": process.env.VALID_LAT, "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("No longitude included in the request");
            });
    });


    it('invalid lon parameter ("foo") in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.VALID_KEY,  "lon": "foo", "lat": process.env.VALID_LAT, "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("Invalid longitude included in the request: foo");
            });
    });

    it('invalid lon parameter (333) in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.VALID_KEY,  "lon": 333, "lat": process.env.VALID_LAT, "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("Invalid longitude included in the request: 333");
            });
    });






    // ====================================================================================
    // =======================================  LAT =======================================
    // ====================================================================================

    it('no lat parameter in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.VALID_KEY,  "lon": process.env.VALID_LON,  "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("No latitude included in the request");
            });
    });

    it('empty lat parameter in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.VALID_KEY, "lon": process.env.VALID_LON, "lat": "", "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("No latitude included in the request");
            });
    });


    it('invalid lat parameter ("foo") in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.VALID_KEY,  "lon": process.env.VALID_LON,  "lat": "foo", "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("Invalid latitude included in the request: foo");
            });
    });

    it('invalid lat parameter (333) in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.VALID_KEY,  "lon": process.env.VALID_LON, "lat": 333, "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("Invalid latitude included in the request: 333");
            });
    });




    // ====================================================================================
    // ======================================  RADIUS =====================================
    // ====================================================================================

    it('no radius parameter in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.VALID_KEY,  "lon": process.env.VALID_LON,  "lat": process.env.VALID_LAT},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("No radius included in the request");
            });
    });

    it('empty radius parameter in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.VALID_KEY, "lon": process.env.VALID_LON, "lat": process.env.VALID_LAT, "radius": ""},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("No radius included in the request");
            });
    });


    it('invalid radius parameter ("foo") in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.VALID_KEY,  "lon": process.env.VALID_LON,  "lat": process.env.VALID_LAT, "radius": "foo"},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("Invalid radius included in the request: foo");
            });
    });

    it('invalid radius parameter (3000) in query string should return statusCode 400 and fully formed error response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.VALID_KEY,  "lon": process.env.VALID_LON, "lat": process.env.VALID_LAT, "radius": 3000},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(400);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("error");
                expect(body).to.have.property("status_code").to.equal(400);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean');
                expect(body).to.have.property("error");
                expect(body.error).to.have.property("message").and.to.equal("Invalid radius included in the request: 3000");
            });
    });







    // ====================================================================================
    // ======================================  VALID ======================================
    // ====================================================================================

    it('valid longitude, latitude and radius parameter in query string should return statusCode 200 and fully formed response', () => {
        const context = {"awsRequestId": uuidv4()};
        const event = {queryStringParameters:{
            "key": process.env.VALID_KEY, "lon": process.env.VALID_LON, "lat": process.env.VALID_LAT, "radius": process.env.VALID_RADIUS},
            requestContext: {identity: {sourceIp: "8.8.8.8"}}, headers:{}};
        return handler.lookup(event, context)
            .then((data) => {
                console.log("data returned from handler.lookup: " + JSON.stringify(data));
                expect(data).to.have.property("statusCode").to.equal(200);
                expect(data).to.have.property("headers");
                expect(data).to.have.property("body");
                const body = JSON.parse(data.body);
                expect(body).to.have.property("status").to.equal("success");
                expect(body).to.have.property("status_code").to.equal(200);
                expect(body).to.have.property("time_elapsed").to.be.a('number');
                expect(body).to.have.property("request");
                expect(body.request).to.have.property("request_id").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("request_ts").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("source_ip").to.be.a('string').and.to.not.be.empty;
                expect(body.request).to.have.property("is_desktop").to.be.a('boolean');
                expect(body.request).to.have.property("is_mobile").to.be.a('boolean');
                expect(body.request).to.have.property("is_smart_tv").to.be.a('boolean');
                expect(body.request).to.have.property("is_tablet").to.be.a('boolean')
                expect(body).to.have.property("lon").to.equal(Number(process.env.VALID_LON));
                expect(body).to.have.property("lat").to.equal(Number(process.env.VALID_LAT));
                expect(body).to.have.property("radius").to.equal(Number(process.env.VALID_RADIUS));
                expect(body).to.have.property("ips");
                expect(body.ips).to.be.an('array').and.to.have.lengthOf(5);
        });

    });

});
