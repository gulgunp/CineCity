/**
 * Created by talha on 23.12.2015.
 */
var Reservation = require("../facade/FReservation");

module.exports = {
    addReservation: function (reservation, callback) {
        Reservation.addReservation(reservation, callback);
    },
    deleteReservation: function (id, callback) {
        Reservation.deleteReservation(id, callback);
    },
    getReservations: function (callback) {
        Reservation.getReservations(callback);
    },
    getReservationsByMovie: function (movieId, callback) {
        Reservation.getReservationsByMovie(movieId, callback);
    },
    getReservationsBySeance: function (seanceId, callback) {
        Reservation.getReservationsBySeance(seanceId, callback);
    },
    updateReservation: function (reservation, callback) {
        Reservation.updateReservation(reservation, callback);
    }
};