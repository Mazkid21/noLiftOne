var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Useradmin = mongoose.Schema({
    local: {
        email: String,
        password: String
    }
});

Useradmin.methods.hash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

Useradmin.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Useradmin', Useradmin);