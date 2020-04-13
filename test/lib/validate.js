'use strict'

const config = require('../config');
const expect  = require("chai").expect;
const validate = require('../../lib/validate');
const { v4: uuidv4 } = require('uuid');


describe('validate.longitude', () => {
    it('no longitude should return error', () => {
        return validate.longitude(null)
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
    it('no latitude should return error', () => {
        return validate.latitude(null)
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
    it('no radius should return error', () => {
        return validate.radius(null)
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
    it('no key should return error', () => {
        return validate.key(null)
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
