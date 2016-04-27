var express = require('express');
var router = express.Router();

var db = require('../services/molab-mysky-api/');
var debug = require('debug')('molab-mysky-api:routes/');


/**
 * serve homepage
 */
router.get('/', function (req, res) {
    res.render('index', {title: 'MySky API'});
});

module.exports = router;
