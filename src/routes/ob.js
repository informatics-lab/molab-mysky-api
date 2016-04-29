var express = require('express');
var router = express.Router();

var db = require('../services/dynamo-db/');
var validator = require('../validators').userObValidator;
var debug = require('debug')('molab-mysky-api:routes/ob');

/**
 * allow userObValidator to post ob.
 */
router.post('/', function (req, res) {

    debug('userObValidator ob posted \n', req.body);

    //validate req payload
    validator.validate(req.body).then(
        function () {
            debug('userObValidator ob valid');

            //TODO fetch professional obs and fcsts

            //add userObValidator ob to db
            db.userObService.add(req.body.deviceId, req.body.sessionId, req.body.location, req.body.ob, [], [])
                .then(
                    function () {
                        debug('userObValidator ob stored');
                        res.status(201).send();
                        return;
                    }
                ).catch(
                    function (err) {
                        debug('userObValidator ob caused server error');
                        res.status(500).send(err);
                        return;
                    }
                );
        }
    ).catch(
        function (err) {
            debug('userObValidator ob payload was invalid');
            res.status(400).send({"errors": err});
            return;
        }
    );

});

module.exports = router;
