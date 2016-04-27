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
var debug = require('debug')('molab-wtf:services/molab-wtf/image-service');

module.exports = {

    /**
     * Inserts a user image into the db
     * @param deviceId - id of device submitting the user ob
     * @param location - location of device submitting the user ob
     * @param data - the image file we are putting
     * @param dt - datetime the image is taken
     * @param obs - array of professional observations taken from device location
     * @param fcsts - array of professional forecasts taken from device location
     * @returns {Promise}
     */
    add: function (deviceId, location, dt, data, obs, fcsts) {
        return new Promise(
            function (resolve, reject) {
                debug("adding user image");
                var params = {
                    TableName: "image",
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
                            data: data
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
    // getKeys: function() {
    //     return new Promise(
    //         function(resolve, reject){
    //             debug("getting all keys")
    //             var params = {RequestItems:
    //                             {"images":
    //                                 {Keys: [],
    //                                 AttributesToGet: ["id"]}}};
    //             docClient.batchGet(params, function(err, data){
    //                 if (err) {
    //                     debug(err, err.stack)
    //                     reject(err)
    //                 }
    //                 else{
    //                     debug(data)
    //                     resolve(data)
    //                 }
    //             })
    //         })
    // },
    // getImage: function(){
    //     return new Promise(
    //         function(resolve, reject){
    //             debug("getting an image")
    //             docClient.get()
    //         })

    // }
};