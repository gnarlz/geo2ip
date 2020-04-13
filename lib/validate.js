'use strict';

const uuidValidate = require('uuid-validate');
const utilities = require('../util/number');

exports.longitude = async (longitude) => {
    try{
        let error;
        if (!longitude) {
            console.error("validate.longitude - longitude required") ;
            error = new Error();
            error.message = "No longitude included in the request";
            error.code = 400;
            throw error;
        }
        else if (! isLongitude(longitude)) {
            console.error("validate.longitude - invalid longitude: " + longitude) ;
            error = new Error();
            error.message = "Invalid longitude included in the request: " + longitude;
            error.code = 400;
            throw error;
        }
        else {
            return null;
        }
    }
    catch(error){
        throw error;
    }
};

exports.latitude = async (latitude) => {
    try{
        let error;
        if (!latitude) {
            console.error("validate.latitude - latitude required") ;
            error = new Error();
            error.message = "No latitude included in the request";
            error.code = 400;
            throw error;
        }
        else if (! isLatitude(latitude)) {
            console.error("validate.latitude - invalid latitude: " + latitude) ;
            error = new Error();
            error.message = "Invalid latitude included in the request: " + latitude;
            error.code = 400;
            throw error;
        }
        else {
            return null;
        }
    }
    catch(error){
        throw error;
    }
};

exports.radius = async (radius) => {
    try{
        let error;
        if (!radius) {
            console.error("validate.radius - radius required") ;
            error = new Error();
            error.message = "No radius included in the request";
            error.code = 400;
            throw error;
        }
        else if (! isRadius(radius)) {
            console.error("validate.radius - invalid radius: " + radius) ;
            error = new Error();
            error.message = "Invalid radius included in the request: " + radius;
            error.code = 400;
            throw error;
        }
        else {
            return null;
        }
    }
    catch(error){
        throw error;
    }
};

exports.key = async (key) => {
    try{
        let error;
        if (!key) {
            console.error("validate.key - key required") ;
            error = new Error();
            error.message = "No API Key included in the request";
            error.code = 400;
            throw error;
        }
        else if (! uuidValidate(key)) {
            console.error("validate.key - key must be UUID: " + key) ;
            error = new Error();
            error.message = "Invalid API Key included in the request: " + key;
            error.code = 400;
            throw error;
        }
        else {
            return null;
        }
    }
    catch(error){
        throw error;
    }
};



function isLongitude(longitude){
    if(! utilities.isnumeric(longitude)){  // must be numeric
        return false;
    }
    else if ((longitude > 180) || (longitude < -180)){  // valid range of longitudes are from -180 to 180 degrees.
        return false;
    }
    else{
        return true;
    }
}

function isLatitude(latitude){
    if(! utilities.isnumeric(latitude)){  // must be numeric
        return false;
    }
    else if ((latitude > 85.05112878) || (latitude < -85.05112878)){  // valid range of longitudes are -85.05112878 to 85.05112878 degrees.
        return false;
    }
    else{
        return true;
    }
}

function isRadius(radius){
    if(! utilities.isnumeric(radius)){  // must be numeric
        return false;
    }
    else if ((radius < 0 ) || (radius > 1000)){  // capped @ 1000 m
        return false;
    }
    else{
        return true;
    }
}