'use strict'

const config = require('../config');
const expect  = require("chai").expect;
const validate = require('../../lib/validate');
const { v4: uuidv4 } = require('uuid');


describe('validate.longitude', () => {
    it('null longitude should return error', () => {
        return validate.longitude(null)
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No longitude included in the request");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('empty longitude should return error', () => {
        return validate.longitude('')
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No longitude included in the request");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('undefined longitude should return error', () => {
        return validate.longitude(undefined)
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No longitude included in the request");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('invalid longitude should return error', () => {
        return validate.longitude(333)
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "Invalid longitude included in the request: 333");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('valid longitude should return null', () => {
        return validate.longitude(process.env.VALID_LON)
            .then((data) => {
                expect(data).to.equal(null);
            })
    });
});



describe('validate.latitude', () => {
    it('null latitude should return error', () => {
        return validate.latitude(null)
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No latitude included in the request");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('empty latitude should return error', () => {
        return validate.latitude('')
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No latitude included in the request");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('undefined latitude should return error', () => {
        return validate.latitude(undefined)
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No latitude included in the request");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('invalid latitude should return error', () => {
        return validate.latitude(333)
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "Invalid latitude included in the request: 333");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('valid latitude should return null', () => {
        return validate.latitude(process.env.VALID_LAT)
            .then((data) => {
                expect(data).to.equal(null);
            })
    });
});



describe('validate.radius', () => {
    it('null radius should return error', () => {
        return validate.radius(null)
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No radius included in the request");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('empty radius should return error', () => {
        return validate.radius('')
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No radius included in the request");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('undefined radius should return error', () => {
        return validate.radius(undefined)
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No radius included in the request");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('invalid radius should return error', () => {
        return validate.radius(2000)
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "Invalid radius included in the request: 2000");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('valid radius should return null', () => {
        return validate.radius(process.env.VALID_RADIUS)
            .then((data) => {
                expect(data).to.equal(null);
            })
    });
});



describe('validate.key', () => {
    it('null key should return error', () => {
        return validate.key(null)
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No API Key included in the request");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('empty key should return error', () => {
        return validate.key('')
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No API Key included in the request");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('undefined key should return error', () => {
        return validate.key(undefined)
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No API Key included in the request");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('invalid key should return error', () => {
        return validate.key("foo")
            .catch( (error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "Invalid API Key included in the request: foo");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            })
    });
    it('valid key should return null', () => {
        return validate.key(process.env.VALID_KEY)
            .then((data) => {
                expect(data).to.equal(null);
            })
    });
});
