var passport = require("passport");
var flash = require('connect-flash');
var express = require('express');
var request = require('request');
var router = express.Router();


// GET /login
router.get('/', (request, response, next) => {
    response.render('login', {
        message: request.flash('loginMessage')
    });
});

// POST /login
router.post('/', (request, response, next) => {
    var loginStrategy = passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    });

    return loginStrategy(request, response, next);
});

module.exports = router;