/**
 * Created by talha on 23.12.2015.
 */
var Cinema = require("../facade/FCinema");

module.exports = {
    addCinema: function (cinema, callback) {
        Cinema.addCinema(cinema, callback);
    },
    deleteCinema: function (id, callback) {
        Cinema.deleteCinema(id, callback);
    },
    getCinemas: function (callback) {
        Cinema.getCinemas(callback);
    },
    getCinema: function (id, callback) {
        Cinema.getCinema(id, callback);
    },
    getCinemasByCompany: function (companyId, callback) {
        Cinema.getCinemas(function (err, result) {
            console.log("logic cinemas");
            if (err) {
                callback(err, null);
                return;
            }
            var cinemas = [];
            for(var i = 0; i < result.length; i++) {
                if(result[i].cineCompany == companyId) {
                    cinemas.push(result[i]);
                }
            }
            callback(err, cinemas);
        });
    },
    updateCinema: function (cinema, callback) {
        Cinema.updateCinema(cinema, callback);
    }
};