var LocalStrategy = require('passport-local').Strategy;

var Useradmin = require('../models/adminUser');
var User = require('../models/user');


module.exports = function (passport) {



    // passport.serializeUser(function (user, callback) {
    //     callback(null, user.id);
    // });

    // passport.deserializeUser(function (id, callback) {
    //     Useradmin.findById(id, function (err, user) {
    //         callback(err, user);
    //     });
    // });

    function SessionConstructor(userId, userGroup, details) {
        this.userId = userId;
        this.userGroup = userGroup;
        this.details = details;
    }

    passport.serializeUser(function (userObject, done) {
        // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
        let userGroup = "user";
        let userPrototype = Object.getPrototypeOf(userObject);

        if (userPrototype === User.prototype) {
            userGroup = "user";
        } else if (userPrototype === Useradmin.prototype) {
            userGroup = "admin";
        }

        let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
        done(null, sessionConstructor);
    });

    passport.deserializeUser(function (sessionConstructor, done) {

        if (sessionConstructor.userGroup == 'user') {
            User.findOne({
                _id: sessionConstructor.userId
            }, '-local.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
                done(err, user);
            });
        } else if (sessionConstructor.userGroup == 'admin') {
            Useradmin.findOne({
                _id: sessionConstructor.userId
            }, '-local.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
                done(err, user);
            });
        }

    });


    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, callback) {
        //Find a user with given email
        User.findOne({
            'local.email': email
        }, function (err, user) {
            if (err) return callback(err);

            //If user already exists
            if (user) {
                return callback(null, false, req.flash('signupMessage', "this email is already taken"));
            } else {
                // User does not exist yet
                //create it
                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.hash(password);

                newUser.save(function (err) {
                    if (err) throw err;
                    return callback(null, newUser);
                });
            }
        });
    }));


    passport.use('admin-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        role: 'role',
        passReqToCallback: true
    }, function (req, email, password, callback) {
        //Find a user with given email
        Useradmin.findOne({
            'local.email': email
        }, function (err, user) {
            if (err) return callback(err);

            //If user already exists
            if (user) {
                return callback(null, false, req.flash('signupMessage', "this email is already taken"));
            } else {
                // User does not exist yet
                //create it
                var newUserAdmin = new Useradmin();
                newUserAdmin.local.email = email;

                newUserAdmin.local.password = newUserAdmin.hash(password);


                newUserAdmin.save(function (err) {
                    if (err) throw err;
                    return callback(null, newUserAdmin);
                });
            }
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, callback) {
        //Search for a user with this email
        User.findOne({
            'local.email': email
        }, function (err, user) {
            if (err) {
                return callback(err);
            }

            // If no user is found
            if (!user) {
                return callback(null, false, req.flash('loginMessage', 'No user found.'));
            }
            // Wrong password
            if (!user.validPassword(password)) {
                return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }

            return callback(null, user);
        });
    }));


    passport.use('admin-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        role: 'role',
        passReqToCallback: true
    }, function (req, email, password, callback) {
        //Search for a user with this email
        Useradmin.findOne({
            'local.email': email
        }, function (err, user) {
            if (err) {
                return callback(err);
            }

            // If no user is found
            if (!user) {
                return callback(null, false, req.flash('loginMessage', 'No user found.'));
            }
            // Wrong password
            if (!user.validPassword(password)) {
                return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }

            return callback(null, user);
        });
    }));

};