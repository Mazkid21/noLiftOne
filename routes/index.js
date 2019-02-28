var express = require('express');
var request = require('request');
var Content = require('../models/content');
var router = express.Router();


/* GET home page. */

router.get('/', function (req, res, next) {

  res.render('index', {
    title: 'Node Project',

  });

});



module.exports = router;