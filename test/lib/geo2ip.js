'use strict'

const config = require('../config');
const expect  = require("chai").expect;
const geo2ip = require('../../lib/geo2ip');

describe('geo2ip.lookup',() => {
    it('no args should return error', () => {
        return geo2ip.lookup()
            .then((data) => {
                expect(data).to.be.null;
            })
            .catch((error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No ip data for lon = undefined lat = undefined radius = undefined");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            });
    });

    it('empty args should return error', () => {
        return geo2ip.lookup('', '', '')
            .then((data) => {
                expect(data).to.be.null;
            })
            .catch((error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No ip data for lon =  lat =  radius = ");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            });
    });


    it('invalid lon should return error', () => {
        return geo2ip.lookup(300, process.env.VALID_LAT, process.env.VALID_RADIUS)
            .then((data) => {
                expect(data).to.be.null;
            })
            .catch((error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No ip data for lon = 300 lat = " +
                    process.env.VALID_LAT + " radius = " + process.env.VALID_RADIUS);
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            });
    });

    it('invalid lat should return error', () => {
        return geo2ip.lookup(process.env.VALID_LON, 300, process.env.VALID_RADIUS)
            .then((data) => {
                expect(data).to.be.null;
            })
            .catch((error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No ip data for lon = " +
                    process.env.VALID_LON + " lat = 300 radius = " + process.env.VALID_RADIUS);
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            });
    });

    it('invalid radius should return error', () => {
        return geo2ip.lookup(process.env.VALID_LON, process.env.VALID_LAT, "foo")
            .then((data) => {
                expect(data).to.be.null;
            })
            .catch((error) =>{
                expect(error).to.be.an.instanceOf(Error).with.property('message', "No ip data for lon = " +
                    process.env.VALID_LON + " lat = " + process.env.VALID_LAT + " radius = foo");
                expect(error).to.be.an.instanceOf(Error).with.property('code', 400);
            });
    });


    it('valid longitude, latitude and radius parameter should return a fully formed json response', () => {
        return geo2ip.lookup(process.env.VALID_LON, process.env.VALID_LAT, process.env.VALID_RADIUS)
            .then((data) => {
                console.log("geo2ip lookup test - data: " + JSON.stringify(data));
                expect(data).to.be.an('array').and.to.have.lengthOf(5);
            })
            .catch((error) =>{
                expect(error).to.be.null;
            });
    });


});
