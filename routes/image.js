var express = require('express');
var router = express.Router();

/* GET image resource. */
router.get('/', function(req, res, next) {
    res.send('respond with a random image');
});

//TODO image api endpoints

module.exports = router;
