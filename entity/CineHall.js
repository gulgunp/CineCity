/**
 * Created by talha on 21.12.2015.
 */
var LSeat = require("../logiclayer/LSeat");
var LCinema = require("../logiclayer/LCinema");

var CineHall = function (obj) {
    this.id = obj.ID || obj.id || -1;
    this.cinema = obj.cinema || obj.CINEMA;
    this.name = obj.NAME || obj.name;
    this.numOfSeat = obj.NUM_OF_SEAT || obj.num_of_seat || 0;
    var SEATS = null;
    var CINEMA = null;
    this.getSeats = function (callback) {
        if(SEATS == null) {
            LSeat.getSeatsInCineHall(this, function (err, result) {
                if(err) {
                    callback(err, null);
                    return;
                }
                SEATS = result;
                callback(err, SEATS);
            });
        } else {
            callback(null, SEATS);
        }
    };

    this.getCinema = function (callback) {
        if(CINEMA == null) {
            LCinema.getCinema(this.cinema, function (err, result) {
                if(err) {
                    callback(err, null);
                    return;
                }
                CINEMA = result;
                callback(err, CINEMA);
            });
        } else {
            callback(null, CINEMA);
        }
    };
};


module.exports = CineHall;