var express = require('express');
var router = express.Router();

var db = require('../services/dynamo-db');
var s3 = require('../services/s3');
var debug = require('debug')('molab-mysky-api:routes/image');
var multer = require('multer');
var validator = require('../validators').imageObValidator;

var storage = multer.memoryStorage();
var upload = multer({storage: storage, size: 20000000});

/**
 * allow userObValidator to get random image
 */
router.get('/', function (req, res) {
    debug("getting random image");
    db.imageService.getAllIds()
        .then(
            function (data) {
                var randomIndex = Math.floor(Math.random() * (data.Items.length + 1));
                var id = data.Items[randomIndex].id;
                db.imageService.getImageById(id)
                    .then(
                        function (data) {
                            res.send(data);
                            return;
                        }
                    ).catch(
                        function (err) {
                            res.status(500).send(err);
                            return;
                        }
                    );
            }
        ).catch(
            function (err) {
                res.status(500).send(err);
                return;
            }
        );
});

/**
 * allow userObValidator to post image.
 */
router.post('/', upload.single('image'), function (req, res) {

    debug('image posted \n', req.body);

    //TODO add validation

    s3.imageService.add(req.file.buffer)
        .then(
            function (data) {

                //TODO fetch professional obs and fcsts

                //add userObValidator image to db
                var location = {latitude: req.body.latitude, longitude: req.body.longitude};
                db.imageService.add(req.body.deviceId, location, req.body.dt, data.Location, [], [])
                    .then(
                        function () {
                            debug('userObValidator image stored');
                            res.status(201).send();
                            return;
                        }
                    ).catch(
                    function (err) {
                        debug('userObValidator image caused server error');
                        res.status(500).send(err);
                        return;
                    });
            }
        ).catch(
            function (err) {
                debug(err);
                res.status(500).send(err);
                return;
            }
        );

});

/**
 * allow userObValidator to post image ob
 */
router.post('/ob', function (req, res) {

    debug('image ob posted \n', req.body);

    validator.validate(req.body)
        .then(
            function () {
                db.imageObService.add(req.body.deviceId, req.body.sessionId, req.body.imageId, req.body.ob)
                    .then(
                        function () {
                            debug('image observation stored');
                            res.status(201).send();
                            return;
                        }
                    ).catch(
                    function (err) {
                        debug('image observation caused server error');
                        res.status(500).send(err);
                        return;
                    }
                );
            }
        ).catch(
            function (err) {
                debug('image observation was invalid');
                res.status(400).send(err);
                return;
            }
        );

});


module.exports = router;
