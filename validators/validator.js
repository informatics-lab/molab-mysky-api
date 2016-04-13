/**
 * Created by tom on 13/04/16.
 */


var Validator = require('jsonschema').Validator;
var v = new Validator();

module.exports = function(schema) {

    return {
        validate: function (payload) {
            return new Promise(
                function (resolve, reject) {
                    var valid = v.validate(payload, schema);
                    if (valid.errors.length == 0) {
                        resolve();
                    } else {
                        reject(valid.errors);
                    }
                }
            );

        }
    }
};