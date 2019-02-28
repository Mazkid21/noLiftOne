var express = require('express');
var request = require('request');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost/noLiftOne";

router.get('/', (req, res) => {

    MongoClient.connect(url, (err, db) => {
        var cursor = db.collection('press');
        cursor.find({}).toArray((err, results) => {
            res.render('press', {

                items: results
            });
        });
    });





});


module.exports = router;