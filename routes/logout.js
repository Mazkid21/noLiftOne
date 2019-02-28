var passport = require("passport");
var express = require('express');
var request = require('request');
var router = express.Router();
var flash = require('connect-flash');

// GET /logout
router.get('/', (request, response, next) => {
    request.logout();
    response.redirect('/');
});

module.exports = router;