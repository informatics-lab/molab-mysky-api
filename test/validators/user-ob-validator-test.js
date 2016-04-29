var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('user observation validator', function () {

    var validator;
    var ob;

    before(function() {
        validator = require('../../src/validators').userObValidator;
    });

    beforeEach(function() {
       ob = {
           "deviceId": "id",
           "sessionId" : "id",
           "location": {
               "latitude": 0.0,
               "longitude": 0.0
           },
           "ob": "id"
       };
    });

    afterEach(function() {
       ob = null;
    });

    context('when validating a valid user observation', function () {
        it('a valid ob is valid', function () {
            return expect(validator.validate(ob)).to.eventually.be.fulfilled;
        });

        context('boundry testing latitude', function() {
            it('upper bound 90 is valid', function () {
                ob.location.latitude = 90;
                return expect(validator.validate(ob)).to.eventually.be.fulfilled;
            });

            it('above upper bound 90 is invalid', function () {
                ob.location.latitude = 90.01;
                return expect(validator.validate(ob)).to.eventually.be.rejected;
            });

            it('lower bound -90 is valid', function () {
                ob.location.latitude = -90;
                return expect(validator.validate(ob)).to.eventually.be.fulfilled;
            });

            it('below lower bound -90 is invalid', function () {
                ob.location.latitude = -90.01;
                return expect(validator.validate(ob)).to.eventually.be.rejected;
            });
        });

        context('boundry testing longitude', function() {
            it('upper bound 180 is valid', function () {
                ob.location.longitude = 180;
                return expect(validator.validate(ob)).to.eventually.be.fulfilled;
            });

            it('above upper bound 180 is invalid', function () {
                ob.location.longitude = 180.01;
                return expect(validator.validate(ob)).to.eventually.be.rejected;
            });

            it('lower bound -180 is valid', function () {
                ob.location.longitude = -180;
                return expect(validator.validate(ob)).to.eventually.be.fulfilled;
            });

            it('below lower bound -180 is invalid', function () {
                ob.location.longitude = -180.01;
                expect(validator.validate(ob)).to.eventually.be.rejected;
            });
            
        });

    });

});