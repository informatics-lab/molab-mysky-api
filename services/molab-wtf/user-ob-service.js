/**
 * Created by tom on 07/04/16.
 */

var AWS = require('aws-sdk');
AWS.config.update({
    region: "eu-west-1",
});
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
var uuid = require('node-uuid');

//logging
var debug = require('debug')('molab-wtf:services/molab-wtf/user-ob-service');

module.exports = {

    /**
     * Inserts a user ob into the db
     * @param deviceId - id of device submitting the user ob
     * @param sessionId - session id of submission
     * @param location - location of device submitting the user ob
     * @param ob - ob id value
     * @param obs - array of professional observations taken from device location
     * @param fcsts - array of professional forecasts taken from device location
     * @returns {Promise}
     */
    add: function (deviceId, sessionId, location, ob, obs, fcsts) {
        return new Promise(
            function (resolve, reject) {
                debug("adding user observation");
                var params = {
                    TableName: "user_obs",
                    Item: {
                        id : uuid.v4(),
                        type: "Feature",
                        geometry : {
                            type: "Point",
                            coordinates: [location.latitude, location.longitude]
                        },
                        properties: {
                            deviceId : deviceId,
                            sessionId: sessionId,
                            dt: new Date().toISOString(),
                            obs: obs,
                            fcsts: fcsts,
                            ob: ob
                        }
                    },
                    "ConditionExpression": "attribute_not_exists(id)"
                };
                docClient.put(params, function (err, data) {
                    if (err) {                              // an error occurred
                        debug(err, err.stack);
                        reject(err);
                    }
                    else {                                  // successful response from db
                        resolve(data);
                    }
                });
            });
    }

};