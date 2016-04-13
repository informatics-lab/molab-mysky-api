var express = require('express');
var router = express.Router();
var passport = require('passport');

var db = require('../services/molab-wtf');
var debug = require('debug')('molab-wtf:routes/');


/**
 * serve homepage
 */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'What The Forecast API'});
});

/*
 * Just a test resource to confirm we are able to access protected resources
 */
//TODO
//router.get('/secret',
//    passport.authenticate('basic', {session :false}),
//    function (req, res) {
//        console.log(req);
//        res.send(req.user.username + " you're logged in so can access secret resources!");
//    }
//);


module.exports = router;
