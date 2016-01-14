/**
 * Created by talha on 23.11.2015.
 */
var express = require('express');
var router = express.Router();
var logicLayer = require('../logiclayer/logicLayer');
var Movie = require('../entity/Movie');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/admin', {});
});
router.get('/dashboard', function(req, res, next) {

    logicLayer.Movie.getMostViewedMovie(function(err, movie) {
        if(err) {
            var error = new Error("Something went wrong while fetching movies!!");
            next(error);
        } else {
            logicLayer.Member.getMembers(function (err, members) {
                if(err) {
                    var error = new Error("Something went wrong while fetching members!!");
                    next(error);
                } else {
                    console.log("members: ",members);
                    res.render('admin/dashboard', { mostViewedMovie: movie, members: members });
                }
            }, 10, true);

        }
    });

});

router.get('/dashboard/movies', function(request, response, next) {
    response.render('admin/dashboard/movies', {});
});

router.get('/dashboard/seances', function(request, response, next) {
    response.render('admin/dashboard/seances', {});
});

router.get("/dashboard/members", function (request, response, next) {
    response.render("admin/dashboard/members", {});
});

router.get('/dashboard/cinecompanies', function (req, res, next) {
    logicLayer.CineCompany.getCineCompanies(function (err, result) {
        if(err) {
            var error = new Error("Something went wrong while fetching movies!!");
            next(error);
        } else {
            res.render("admin/dashboard/cinecompanies", { companies: result });
        }
    });

});

router.get('/dashboard/cinecompanies/:companyId/cinemas', function (req, res, next) {
    logicLayer.CineCompany.getCineCompany(req.params.companyId, function (err, result) {
        if (err) {
            var error = new Error("Something went wrong while fetching cinecompany!!")
            next(error);
        } else {
            res.render("admin/dashboard/cinemas", {company: result[0]});
        }
    });
});

router.get('/dashboard/cinecompanies/:companyId/cinemas/:cinemaId/cinehalls', function (req, res, next) {
    logicLayer.Cinema.getCinema(req.params.cinemaId, function (err, result) {
        if (err) {
            var error = new Error("Something went wrong while fetching cinecompany!!")
            next(error);
        } else {
            res.render("admin/dashboard/cinehalls", {cinema: result[0]});
        }
    });
});

router.get('/dashboard/:cineHallId/seats', function (req, res, next) {
    logicLayer.CineHall.getCineHall(req.params.cineHallId, function (err, result) {
        if (err) {
            var error = new Error("Something went wrong while fetching cinecompany!!")
            next(error);
        } else {
            res.render("admin/dashboard/seats", {cineHall: result[0]});
        }
    })
});

router.get('/dashboard/campaigns', function (req, res, next) {
    res.render("admin/dashboard/campaigns", {});
});

module.exports = router;