var express = require('express');
var router = express.Router();

/* GET image resource. */
router.get('/', function(req, res) {
    //TODO
    //authenticate user.
    //return random image.
});

router.post('/', function(req, res) {
    //TODO
    //authenticate user.
    //validate payload
    //add image to db
    //respond
});


router.post('/ob', function(req, res) {
    //TODO
    //authenticate user
    //validate req payload
    //add image ob
    //respond
});


//TODO image api endpoints

module.exports = router;
