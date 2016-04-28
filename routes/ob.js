var express = require('express');
var router = express.Router();

var db = require('../services/molab-mysky-db/');
var validator = require('../validators').userObValidator;
var debug = require('debug')('molab-mysky-api:routes/ob');

/**
 * allow user to post ob.
 */
router.post('/', function(req, res) {

    debug('user ob posted \n', req.body);

    //validate req payload
    validator.validate(req.body).then(
        function() {
            debug('user ob valid');

            //TODO fetch professional obs and fcsts

            //add user ob to db
            db.userObService.add(req.body.deviceId, req.body.sessionId, req.body.location, req.body.ob, [], []).then(
                function() {
                    debug('user ob stored');
                    res.sendStatus(201);
                    return;
                }
            ).catch(
                function(err) {
                    debug('user ob caused server error');
                    res.status(500).send(err);
                    return;
                }
            );
        }
    ).catch(
        function(err) {
            debug('user ob payload was invalid');
            res.status(400).send({"errors":err});
            return;
        }
    );

});

module.exports = router;
