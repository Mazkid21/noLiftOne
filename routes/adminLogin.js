var passport = require("passport");
var express = require('express');
var request = require('request');
var router = express.Router();
var flash = require('connect-flash');

// GET /login
router.get('/', (request, response, next) => {
    response.render('adminLogin', {
        message: "LOGIN MESSAGE"
    });
});

// POST /login
router.post('/', (request, response, next) => {
    var loginStrategy = passport.authenticate('admin-login', {
        successRedirect: '/admin',
        failureRedirect: '/admin-signup',
        failureFlash: true
    });

    return loginStrategy(request, response, next);
});


module.exports = router;