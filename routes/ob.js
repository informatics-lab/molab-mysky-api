var express = require('express');
var router = express.Router();

var db = require('../services/dynamo-db/');
var validator = require('../validators').userObValidator;
var debug = require('debug')('molab-mysky-api:routes/ob');
var datapoint = require('../services/datapoint/');

router.get('/', function (req, res) {
  datapoint.obsService.get({latitude: 50.7, longitude:-3.5})
  .then(function(data) {
    debug(data);
    res.send(data);
    return;
  })
  //res.status(500).send("error");
});


/**
 * allow user to post ob.
 */
router.post('/', function (req, res) {


    debug('user ob posted \n', req.body);

    //validate req payload
    validator.validate(req.body).then(
        function () {
            debug('user ob valid');

            //TODO fetch professional obs and fcsts
            var obs = datapoint.obsService.get(req.body.location);
            var fcst = datapoint.fcstService.get(req.body.location);
            //add user ob to db
            db.userObService.add(req.body.deviceId, req.body.sessionId, req.body.location, req.body.ob, [], [])
                .then(
                    function () {
                        debug('user ob stored');
                        res.sendStatus(201);
                        return;
                    }
                ).catch(
                    function (err) {
                        debug('user ob caused server error');
                        res.status(500).send(err);
                        return;
                    }
                );
        }
    ).catch(
        function (err) {
            debug('user ob payload was invalid');
            res.status(400).send({"errors": err});
            return;
        }
    );

});

module.exports = router;
