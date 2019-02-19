var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {

    res.render('facts');


});


module.exports = router;