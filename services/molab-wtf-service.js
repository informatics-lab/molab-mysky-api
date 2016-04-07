/**
 * Created by tom on 07/04/16.
 */

var AWS = require('aws-sdk');

AWS.config.update({
    region: "eu-west-1",
    //endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'}).;

var debug = require('debug')('molab-wtf:services/molab-wtf-service');

module.exports = {

    addUser : function(username, password) {
        debug("adding user :", username);
        var params = {
            ExclusiveStartTableName: 'STRING_VALUE'
        };
        dynamodb.put(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
        });
    },

    updateUser : function(username, password) {},

    addUserOb : function(userId, location, obs, ob) {}

};