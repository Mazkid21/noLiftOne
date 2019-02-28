var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var userInfo = require('./userInfo');

var User = mongoose.Schema({
  local: {
    email: String,
    password: String,
  },
  userInfo: [{
    description: String,
    other: String
  }]
});

User.methods.hash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);