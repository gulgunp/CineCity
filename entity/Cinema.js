/**
 * Created by talha on 22.12.2015.
 */

var LCineHall = require("../logiclayer/LCineHall");

var Cinema = function (obj) {
    this.id = obj.ID || obj.id || -1;
    this.cineCompany = obj.CINE_COMPANY || obj.cine_company;
    this.name = obj.NAME || obj.name;
    this.town = obj.TOWN || obj.town;
    this.city = obj.CITY || obj.city;
    this.numOfHall = obj.NUM_OF_HALL || obj.num_of_hall || 0;
    var HALLS = null;

    this.getHalls = function (callback) {
        if(HALLS == null) {
            LCineHall.getCineHallByCinema(this.id, function (err, result) {
                if(err) {
                    callback(err, null);
                    return;
                }
                HALLS = result;
                callback(err, HALLS);
            });
        } else {
            callback(null, HALLS);
        }
    };

};

module.exports = Cinema;