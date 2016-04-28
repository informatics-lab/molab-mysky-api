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
var debug = require('debug')('molab-mysky-api:services/molab-mysky-db/image-service');

module.exports = {

    /**
     * Inserts a user image into the db
     * @param deviceId - id of device submitting the user ob
     * @param location - location of device submitting the user ob
     * @param dt - datetime the image is taken
     * @param fileUrl - the s3 bucket location of the image
     * @param obs - array of professional observations taken from device location
     * @param fcsts - array of professional forecasts taken from device location
     * @returns {Promise}
     */
    add: function (deviceId, location, dt, fileUrl, obs, fcsts) {
        return new Promise(
            function (resolve, reject) {
                debug("adding user image");
                var params = {
                    TableName: "images",
                    Item: {
                        id: uuid.v4(),
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [location.latitude, location.longitude]
                        },
                        properties: {
                            deviceId: deviceId,
                            dt: dt,
                            obs: obs,
                            fcsts: fcsts,
                            fileUrl: fileUrl
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
    },

    /**
     * Gets all ids from the image db
     * @returns {Promise}
     */
    getAllIds: function () {
        return new Promise(
            function (resolve, reject) {
                debug("getting all ids");
                var params = {
                    TableName: "images",
                    ProjectionExpression: "id"
                };
                docClient.scan(params, function (err, data) {
                    if (err) {
                        debug(err, err.stack);
                        reject(err)
                    }
                    else {
                        resolve(data)
                    }
                })
            })
    },

    /**
     * Gets a specific image from the db by its id
     * @param id - the id of the image to fetch
     * @returns {Promise}
     */
    getImageById: function (id) {
        return new Promise(
            function (resolve, reject) {
                debug("getting image with id " + id);
                var params = {
                    TableName: "images",
                    Key: {id: id}
                };
                docClient.get(params, function (err, data) {
                    if (err) {
                        debug(err, err.stack);
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            }
        );
    }
};