var express = require('express');
var router = express.Router();

var db = require('../services/molab-wtf');
var validator = require('../validators').userImageValidator;
var debug = require('debug')('molab-mysky-api:routes/image');
var multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage, size: 20000000})

/**
 * allow user to post image.
 */
router.post('/', upload.single('image'), function(req, res) {

    debug('user image posted \n', req.body);
    debug('req.files', req.file);

    //validate req payload
    // validator.validate(req.body).then(
    //     function() {
            debug('user image valid');

            //TODO fetch professional obs and fcsts

            //add user image to db
            var location = {latitude: req.body.latitude, longitude: req.body.longitude};
            db.imageService.add(req.body.deviceId, location, req.body.dt, req.file.buffer, [], []).then(
                function() {
                    debug('user image stored');
                    res.sendStatus(201);
                    return;
                }
            ).catch(
                function(err) {
                    debug('user image caused server error');
                    res.status(500).send(err);
                    return;
                }
            );
        // }
    // ).catch(
    //     function(err) {
    //         debug('user image payload was invalid');
    //         res.status(400).send({"errors":err});
    //         return;
    //     }
    // );

});

module.exports = router;
