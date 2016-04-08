/*
 * connects to mo datapoint and gets obs
 *
 */

var datapoint = require('datapoint-js');
datapoint.set_key("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee");

module.exports = {

    getOb : function(location, dt) {
        return new Promise(
            function(resolve, reject) {
                //TODO
            }
        );
    },

    getForecast : function(location, dt) {
        return new Promise(
            function(resolve, reject) {
                //TODO
            }
        );
    }

};