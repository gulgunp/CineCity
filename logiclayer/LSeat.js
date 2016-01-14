/**
 * Created by talha on 22.12.2015.
 */
var Seat = require("../facade/FSeat");

module.exports = {
    addSeat: function (seat, callback) {
        Seat.addSeat(seat, callback);
    },
    deleteSeat: function (seat, callback) {
        Seat.deleteSeat(seat,callback);
    },
    getSeatsInCineHall: function (cineHall, callback) {
        Seat.getSeatsInCineHall(cineHall, callback);
    },
    getEmptySeatCountForSeance: function (seance, callback) {
        Seat.getEmptySeatCountForSeance(seance, callback);
    },
    getSeatsWithStateBySeance: function (seanceId, cinehallId, callback) {
        Seat.getFullSeatsBySeance(seanceId, function (err, result) {
            var fullSeats = [];
            if(err) {
                callback(err, null);
                return;
            }
            fullSeats = result;

            var isContains = function (seat) {
                for(var i = 0; i < fullSeats.length; i++) {
                    if(seat.seatCode == fullSeats[i].seatCode) {
                        return true;
                    }
                }
                return false;
            };

            Seat.getSeatsInCineHall({id: cinehallId}, function (err, result) {
                if(err) {
                    callback(err, null);
                    return;
                }
                for(var i = 0; i < result.length; i++) {
                    if(isContains(result[i])) {
                        result[i].state = 1;
                    } else {
                        result[i].state = 0;
                    }
                }
                callback(err, result);
            });

        });
    }
};