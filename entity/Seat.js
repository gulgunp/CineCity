/**
 * Created by talha on 22.12.2015.
 */
var FCineHall = require("../facade/FCineHall");

var Seat = function (obj) {
    this.seatCode = obj.SEAT_CODE || obj.seat_code || -1;
    this.cineHall = obj.CINE_HALL || obj.cine_hall || -1;
    var HALL = null;

    this.getCineHall = function (callback) {
        if(HALL == null) {
            FCineHall.getCineHall(this.cineHall, function (err, result) {
                if (err) {
                    callback(err, null);
                    return;
                }
                HALL = result[0];
                callback(err, HALL);
            });
        } else {
            callback(null, HALL);
        }
    }

};

module.exports = Seat;