var passport = require("passport");
var express = require('express');
var request = require('request');
var router = express.Router();
var flash = require('connect-flash');


// GET /signup
router.get('/', (request, response, next) => {

    response.render('adminSignUp', {
        message: "PLEASE SIGN UP"
    });
});

// POST /signup
router.post('/', (request, response, next) => {
    //save a new user
    var signupStrategy = passport.authenticate('admin-signup', {
        successRedirect: '/admin',
        failureRedirect: '/admin-signup',
        failureFlash: true
    });

    return signupStrategy(request, response, next);
});



module.exports = router;