var express = require('express');
var router = express.Router();

var db = require('../services/molab-wtf-service');
var debug = require('debug')('molab-wtf:routes/user');

/**
 * allow user to login
 */
router.get('/login', function(req, res) {
  res.send('login');
});


/**
 * allow user to logout
 */
router.get('/logout', function(req, res) {
  res.send('logout');
});


/**
 * allow user to register
 */
router.post('/register', function(req, res) {

  var username = req.body.username;
  var password = req.body.password;

  debug("registering :",username);
  db.addUser(username, password);
  res.sendStatus(201);
});


/**
 * insert user ob
 */
router.post('/ob', function(req, res) {
  db.addUserOb();

});


module.exports = router;
