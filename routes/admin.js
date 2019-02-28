var express = require('express');
var request = require('request');
var passport = require("passport");
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;


var url = "mongodb://localhost/noLiftOne";


var router = express.Router();


router.post('/insert', (req, res, next) => {

    var item = {
        title: req.body.title,
        date: req.body.date,
        thumbnailAdress: req.body.thumbnailAdress,
        articleAdress: req.body.articleAdress

    };

    MongoClient.connect(url, (err, db) => {

        db.collection('press').insertOne(item, (err, result) => {
            console.log(item + ': item inserted');
            db.close();
        });
    });
    res.redirect('/admin');


});

router.post('/update', (req, res, next) => {
    var item = {};

    if (req.body.title) item.title = req.body.title;
    if (req.body.date) item.date = req.body.date;
    if (req.body.thumbnailAdress) item.thumbnailAdress = req.body.thumbnailAdress;
    if (req.body.articleAdress) item.articleAdress = req.body.articleAdress;



    var id = req.body.id;
    console.log(id);
    MongoClient.connect(url, (err, db) => {

        db.collection('press').updateOne({
            "_id": objectId(id)
        }, {
            $set: item
        }, (err, result) => {
            console.log(item + ': item updated');
            db.close();
        });
    });
    res.redirect('/admin');

});

router.post('/delete', (req, res, next) => {
    var id = req.body.id;
    MongoClient.connect(url, (err, db) => {

        db.collection('press').deleteOne({
            "_id": objectId(id)
        }, (err, result) => {
            console.log(': item updated');
            db.close();
        });
    });
    res.redirect('/admin');
});

// router.post('/insert-videos', (req, res, next) => {

//     var video = {
//         title: req.body.title,
//         description: req.body.description,
//         imgURL: req.body.imgURL,
//         videoURL: req.body.videoURL,

//     };

//     MongoClient.connect(url, (err, db) => {

//         db.collection('video').insertOne(video, (err, result) => {
//             console.log(video + ': item inserted');
//             db.close();
//         });
//     });
//     res.redirect('/admin');


// });
router.get('/:id', (req, res) => {

    var id = req.params.id;
    console.log(objectId(id) + "this is th idd");
    if (req.isAuthenticated()) {

        var resultsArray = [];
        MongoClient.connect(url, (err, db) => {
            var cursor = db.collection('press');
            cursor.find({
                "_id": objectId(id)
            }).toArray((err, results) => {
                res.render('adminOne', {
                    items: results
                });
            });
        });

    } else {
        res.redirect('/login');

    }


});




router.get('/', (req, res, next) => {
    // console.log(req.session.passport.user.userGroup);


    if (req.isAuthenticated()) {
        if (req.session.passport.user.userGroup === 'admin') {
            //route for admin
            var resultsArray = [];
            MongoClient.connect(url, (err, db) => {
                var cursor = db.collection('press');
                cursor.find({}).toArray((err, results) => {
                    res.render('admin', {
                        items: results
                    });
                });
            });
        } else {
            //rote for non-admin
            res.redirect('/admin-login');
        }
    } else {
        res.redirect('/admin-login');
    }


});






module.exports = router;