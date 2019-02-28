const dotenv = require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var request = require('request');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require("passport");
var flash = require('connect-flash', 'req-flash');


//Routes....dont forget to add to app.use() below
var adminSignUpRoute = require('./routes/adminSignup');
var adminLoginRoute = require('./routes/adminLogin');
var admin = require('./routes/admin');
var homeRoute = require('./routes/index');
var voteRoute = require('./routes/vote');
var supportersRoute = require('./routes/supporters');
var supportRoute = require('./routes/support');
var pressRoute = require('./routes/press');
var factsRoute = require('./routes/facts');
var pressRoute = require('./routes/press');
var logOutRoute = require('./routes/logout');
var app = express();

mongoose.connect('mongodb://localhost/noLiftOne', {
  useNewUrlParser: true
});

//passport

var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
mongoose.connect('mongodb://localhost/bRockHillLive');
app.use(session({
  secret: "Rusty is the best and cutest dog in the world",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    secret: "Rusty is the best and cutest dog in the world",
    maxAge: 3600000 //1 hour
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passportAdmin')(passport);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// view engine setup
//EXPRESS (app) START TEMPLTING ENGINE (handlebars)
app.engine(
  '.hbs',
  exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
  })
);
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//express use routes
app.use('/', homeRoute);
app.use('/vote', voteRoute);
app.use('/supporters', supportersRoute);
app.use('/press', pressRoute);
app.use('/facts', factsRoute);
app.use('/support', supportRoute);
app.use('/admin-signup', adminSignUpRoute);
app.use('/admin-login', adminLoginRoute);
app.use('/admin', admin);
app.use('/logout', logOutRoute);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;