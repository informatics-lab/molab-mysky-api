var express = require('express');
var router = express.Router();

var db = require('../services/molab-mysky-db');
var s3 = require('../services/s3');
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
    s3.S3Service.add(req.file.buffer).then(function(data){
        debug(data)

        //TODO fetch professional obs and fcsts

        //add user image to db
        var location = {latitude: req.body.latitude, longitude: req.body.longitude};
        db.imageService.add(req.body.deviceId, location, req.body.dt, data.Location, [], []).then(
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
    }).catch(function(err){
        debug(err)
        res.status(500).send(err);
        return;
    })

});

router.get('/', function(req, res){
    debug("getting image")
    db.imageService.getAllIds().then(function(data){
        var id = data.Items[Math.floor(Math.random()*(data.Items.length+1))].id;
        db.imageService.getImageById(id).then(function(data){
            res.send(data);
            return;
        }).catch(function(err){
            res.status(500).send(err);
            return;
        });
    }).catch(function(err){
        res.status(500).send(err);
        return;
    });
});

module.exports = router;
