var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('image observation validator', function () {

    var validator;
    var ob;

    before(function() {
        validator = require('../../src/validators').imageObValidator;
    });

    beforeEach(function() {
       ob = {
           "deviceId": "id",
           "sessionId" : "id",
           "imageId": "id",
           "ob": "id"
       };
    });

    afterEach(function() {
       ob = null;
    });

    context('when validating a valid image observation', function () {
        it('a valid ob is valid', function () {
            return expect(validator.validate(ob)).to.eventually.be.fulfilled;
        });
    });

});