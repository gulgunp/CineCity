/**
 * Created by talha on 22.12.2015.
 */
var CineHall = require("./../facade/FCineHall");

module.exports = {
    addCineHall: function (cineHall, callback) {
        CineHall.addCineHall(cineHall, callback);
    },
    getCineHallByCinema: function (cinemaId, callback) {
        CineHall.getCineHallByCinema(cinemaId, callback);
    },
    getCineHall: function (id, callback) {
        CineHall.getCineHall(id, callback);
    },
    updateCineHall: function (cineHall, callback) {
        CineHall.updateCineHall(cineHall, callback);
    },
    deleteCineHall: function (id, callback) {
        CineHall.deleteCineHall(id, callback);
    }
}