var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'CineCity'});
});

router.get('/cinehall', function (reg, res, next) {
    res.render('cinehall', {});
});

router.get('/profile', function (reg, res, next) {
    res.render('profile', {})
});

router.get('/register', function (reg, res, next) {
    res.render('register', {})
});

router.get('/store', function (req, res, next) {
    res.render('store', {});
});

router.get('/buyticket', function (req, res, next) {
    res.render('ticket', { title: "CineCity" });
});

module.exports = router;
