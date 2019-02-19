var express = require('express');
var request = require('request');
var Content = require('../models/content');
var router = express.Router();


/* GET home page. */

router.get('/', function (req, res, next) {
  Content.find(function (err, content) {
    res.render('index', {
      title: 'Node Project',
      contents: content
    });
  });
});



module.exports = router;