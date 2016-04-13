var express = require('express');
var router = express.Router();

var db = require('../services/molab-wtf');
var debug = require('debug')('molab-wtf:routes/');


/**
 * serve homepage
 */
router.get('/', function (req, res) {
    res.render('index', {title: 'What The Forecast API'});
});

module.exports = router;
