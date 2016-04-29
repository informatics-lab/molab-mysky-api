/**
 * Service for storing image observation documents in DynamoDb
 */

var AWS = require('aws-sdk');
AWS.config.update({
    region: "eu-west-1",
});
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
var uuid = require('node-uuid');

//logging
var debug = require('debug')('molab-mysky-api:services/dynamo-db/image-ob-service');

module.exports = {

    /**
     * Inserts an image observation into the db
     * @param deviceId - id of device submitting the userObValidator ob
     * @param sessionId - session id of submission
     * @param location - location of device submitting the userObValidator ob
     * @param ob - ob id value
     * @returns {Promise}
     */
    add: function (deviceId, sessionId, imageId, ob) {
        return new Promise(
            function (resolve, reject) {
                debug("adding image observation");
                var params = {
                    TableName: "image_obs",
                    Item: {
                        id: uuid.v4(),
                        imageId : imageId,
                        deviceId: deviceId,
                        sessionId: sessionId,
                        dt: new Date().toISOString(),
                        ob: ob
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