var express = require('express');
var router = express.Router();

var db = require('../services/molab-wtf');
var validator = require('../validators').userImageValidator;
var debug = require('debug')('molab-wtf:routes/image');

/**
 * allow user to post image.
 */
router.post('/', function(req, res) {

    debug('user image posted \n', req.body);

    //validate req payload
    validator.validate(req.body).then(
        function() {
            debug('user image valid');

            //TODO fetch professional obs and fcsts

            //add user image to db
            db.userimageService.add(req.body.deviceId, req.body.sessionId, req.body.location, req.body.image, [], []).then(
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
        }
    ).catch(
        function(err) {
            debug('user image payload was invalid');
            res.status(400).send({"errors":err});
            return;
        }
    );

});

module.exports = router;
