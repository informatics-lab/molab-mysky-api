var express = require('express');
var router = express.Router();

var db = require('../services/dynamo-db/');
var validator = require('../validators').userObValidator;
var debug = require('debug')('molab-mysky-api:routes/ob');
var datapoint = require('../services/datapoint/');

router.get('/', function (req, res) {
  datapoint.obsService.get({latitude: 50.7, longitude:-3.5})
  .then(function(data) {
    debug(data);
    res.send(data);
    return;
  })
  //res.status(500).send("error");
});


/**
 * allow user to retrieve datapoint ob (forecast) via POST.
 */
router.post('/', function (req, res) {

    debug('user ob POST\n', req.body);
    datapoint.obsService.get({latitude: req.latitude, longitude:req.longitude})
    .then(function(data) {
      debug(data);
      res.send(data);
      return;
    })

});

module.exports = router;
