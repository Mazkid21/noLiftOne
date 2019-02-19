var passport = require("passport");
var express = require('express');
var request = require('request');
var router = express.Router();
var flash = require('connect-flash');

// GET /signup
router.get('/', (req, res, next) => {
    res.render('signup.hbs', {
        message: req.flash('signupMessage')

    });
});

// POST /signup
router.post('/', (request, response, next) => {
    var signupStrategy = passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    });

    return signupStrategy(request, response, next);
});



module.exports = router;