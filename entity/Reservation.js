/**
 * Created by talha on 22.12.2015.
 */
var logicLayer = require("../logiclayer/logicLayer");

var Reservation = function (obj) {
    this.id = obj.ID || obj.id || -1;
    this.expireDate = obj.EXPIRE_DATE || obj.expire_date;
    this.reservationDate = obj.RESERVATION_DATE || obj.reservation_date;
    this.member = obj.MEMBER || obj.member;
    this.seance = obj.SEANCE || obj.seance;
    this.seat = obj.SEAT || obj.seat;
    this.cineHall  = obj.CINE_HALL || obj.cine_hall;
    var HALL = null;
    var SEANCE = null;
    var MEMBER = null;

    this.getMember = function (callback) {
        if (MEMBER == null) {
            logicLayer.Member.getMember(this.member, function (err, result) {
                if(err) {
                    callback(err, null);
                    return;
                }
                MEMBER = result[0];
                callback(err, MEMBER);
            });
        } else {
            callback(null, MEMBER);
        }
    }

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
    }

    this.getSeance = function (callback) {
        /**
         * Fetch from db
         */
    }
};

module.exports = Reservation;