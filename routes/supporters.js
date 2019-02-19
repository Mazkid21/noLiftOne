var express = require('express');
var request = require('request');

var MongoClient = require('mongodb').MongoClient;
var router = express.Router();

var url = "mongodb://localhost/noLiftOne";


var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next) {

    MongoClient.connect(url, (err, db) => {
        var cursor = db.collection('rentals');
        cursor.find({}).toArray((err, results) => {
            console.log(results);
            res.render('supporters', {
                supporters: results
            });
        });
    });
});



module.exports = router;