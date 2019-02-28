var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userInfoSchema = new Schema({


    title: String,
    authors: String,
    description: [String],
    smallThumbnail: String

});

var userInfo = mongoose.model('Book', userInfoSchema);

module.exports = userInfo;