var express = require('express');
var router = express.Router();
var passport = require('passport');

var db = require('../services/molab-wtf');
var debug = require('debug')('molab-wtf:routes/user');


/**
 * serve homepage
 */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'What The Forecast API'});
});


/**
 * serve login page
 */
router.get('/login', function (req, res) {
    res.render('login');
});


/**
 * allow user to login
 */
router.post('/login',
    passport.authenticate('local', {failureRedirect: '/login'}),
    function (req, res) {
        var username = req.body.username;
        debug("user logged in :", username);
        db.userService.updateLastLoginDt(username);
        res.sendStatus(200);
    });

/*
 * Just a test resource to confirm we are logged in/out
 */
router.get('/secret',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.send("you're logged in so can access secret resources!");
    }
);


/**
 * allow user to logout
 */
router.get('/logout',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        req.logout();
        res.sendStatus(200);
    }
);


/**
 * serve registration page
 */
router.get('/register', function (req, res) {
    res.render('register');
});

/**
 * allow user to register
 */
router.post('/register', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;

    debug("attempting to register :", username);

    db.userService.add(username, password).then(
        function (data) {
            res.sendStatus(201);
        }
    ).catch(
        function (err) {
            res.status(err.statusCode).send(err.message);
        }
    );

});


/**
 * allow user to update user credentials
 */
router.put('/register', function (req, res) {
    //TODO
    res.send('update');
});

module.exports = router;
