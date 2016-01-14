/**
 * Created by talha on 22.12.2015.
 */
var LCinema = require('../logiclayer/LCinema');

var CineCompany = function (obj) {
    this.id = obj.ID || obj.id || -1;
    this.name = obj.NAME || obj.name;
    this.numOfCinema = obj.NUM_OF_CINEMA || obj.num_of_cinema || 0;
    var CINEMAS = null;

    this.getCinemas = function (callback) {
        if(CINEMAS == null) {
            LCinema.getCinemasByCompany(this.id, callback);
        } else {
            callback(null, CINEMAS);
        }
    };
};

module.exports = CineCompany;