var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('image validator', function () {

    var validator;
    var image;

    before(function() {
        validator = require('../../src/validators').imageValidator;
    });

    beforeEach(function() {
       image = {
           "dt" : "2016-01-01T00:00:00Z",
           "deviceId": "id",
           "location" : {
               "latitude" : 0.0,
               "longitude" : 0.0
           }
       };
    });

    afterEach(function() {
       image = null;
    });

    context('when validating a valid image', function () {
        it('a valid image is valid', function () {
            return expect(validator.validate(image)).to.eventually.be.fulfilled;
        });


        context('testing date time string for dt', function() {
            it('an invalid dt is rejected', function () {
                image.dt = "something";
                return expect(validator.validate(image)).to.eventually.be.rejected;
            });
        });

        context('boundry testing latitude', function() {
            it('upper bound 90 is valid', function () {
                image.location.latitude = 90;
                return expect(validator.validate(image)).to.eventually.be.fulfilled;
            });

            it('above upper bound 90 is invalid', function () {
                image.location.latitude = 90.01;
                return expect(validator.validate(image)).to.eventually.be.rejected;
            });

            it('lower bound -90 is valid', function () {
                image.location.latitude = -90;
                return expect(validator.validate(image)).to.eventually.be.fulfilled;
            });

            it('below lower bound -90 is invalid', function () {
                image.location.latitude = -90.01;
                return expect(validator.validate(image)).to.eventually.be.rejected;
            });
        });

        context('boundry testing longitude', function() {
            it('upper bound 180 is valid', function () {
                image.location.longitude = 180;
                return expect(validator.validate(image)).to.eventually.be.fulfilled;
            });

            it('above upper bound 180 is invalid', function () {
                image.location.longitude = 180.01;
                return expect(validator.validate(image)).to.eventually.be.rejected;
            });

            it('lower bound -180 is valid', function () {
                image.location.longitude = -180;
                return expect(validator.validate(image)).to.eventually.be.fulfilled;
            });

            it('below lower bound -180 is invalid', function () {
                image.location.longitude = -180.01;
                expect(validator.validate(image)).to.eventually.be.rejected;
            });

        });

    });
    
});