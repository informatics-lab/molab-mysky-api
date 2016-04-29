/**
 * Universal validator
 */

var Validator = require('jsonschema').Validator;
var v = new Validator();

/**
 * @param schema - schema to validate against
 * @returns {{validate: validate}}
 */
module.exports = function(schema) {

    return {
        /**
         * Validates the given object against the schema used to construct this object.
         * @param object - the object to validate
         * @returns {Promise}
         */
        validate: function (object) {
            return new Promise(
                function (resolve, reject) {
                    var valid = v.validate(object, schema);
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