var express = require('express');
var router = express.Router();

var debug = require('debug')('molab-mysky-api:routes/index');


/**
 * serve homepage
 */
router.get('/', function (req, res) {
    res.render('index', {title: 'MySky API'});
});

module.exports = router;
