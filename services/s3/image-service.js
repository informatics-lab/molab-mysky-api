var AWS = require('aws-sdk');
AWS.config.update({
    region: "eu-west-1",
});
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
var uuid = require('node-uuid');

//logging
var debug = require('debug')('molab-mysky-api:services/s3/image-service');

module.exports = {

    /**
     * Inserts a user image into the s3 bucket
     * @param image - the image file we are putting
     * @returns {Promise}
     */
    add: function (image) {
        return new Promise(
            function (resolve, reject) {
                debug("adding user image");
                var params = {
                    Bucket: 'molab-mysky-data',
                    Key: uuid.v4(),
                    Body: image
                };
                var upload = new AWS.S3.ManagedUpload({params: params});
                upload.send(function (err, data) {
                    if (err) {
                        debug(err);
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
            });
    }
};