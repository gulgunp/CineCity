/**
 * Created by talha on 22.12.2015.
 */

var logicLayer = require("../logiclayer/logicLayer");

var Seance = function (obj) {
    this.id = obj.ID || obj.id || -1;
    this.cineHall = obj.CINE_HALL || obj.cine_hall;
    this.startTime = obj.START_TIME || obj.start_time;
    this.endTime = obj.END_TIME || obj.end_time;
    this.movie = obj.MOVIE || obj.movie;
    this.date = obj.S_DATE || obj.s_date;

    var HALL = null;
    var MOVIE = null;

    this.getCineHall = function (callback) {
        if(HALL == null) {
            logicLayer.CineHall.getCineHall(this.cineHall, function (err, result) {
                if(err) {
                    callback(err, null);
                    return;
                }
                HALL = result[0];
                callback(err, HALL);
            })
        } else {
            callback(null, HALL);
        }
    };

    this.getMovie = function (callback) {
        if(MOVIE == null) {
            logicLayer.Movie.getMovie(this.movie, function (err, result) {
                if(err) {
                    callback(err, null);
                    return;
                }
                MOVIE = result[0];
                callback(err, MOVIE);
            })
        } else {
            callback(null, MOVIE);
        }
    }

};

module.exports = Seance;