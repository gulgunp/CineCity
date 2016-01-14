/**
 * Created by talha on 7.12.2015.
 */
var FCineCard = require("../facade/FCineCard");
var FMember = require("../facade/FMember");

var Member = function (obj) {
    this.id = obj.ID || obj.id || -1;
    this.name = obj.NAME || obj.name;
    this.surname = obj.SURNAME || obj.surname;
    this.phone = obj.PHONE || obj.phone;
    this.email = obj.EMAIL || obj.email;
    this.password = obj.PASSWORD || obj.password;
    this.cineCardId = obj.CINE_CARD || obj.cine_card || -1;
    this.admin = obj.ADMIN || obj.admin || 0;
    var cineCard = null;

    this.isAdmin = function () {
        return this.admin == 1;
    };

    this.getCineCard = function (callback) { // callback needs err and result parameters
        if(cineCard != null) {
            callback(null, {
                hasCinecard: true,
                cineCard: cineCard
            });
            return;
        } else {
            if (this.cineCardId == -1) {
                callback({
                    hasCinecard: false,
                    message: "This user hasn't got a cine card."
                }, null);
            } else {
                FCineCard.getCineCard(this.cineCardId, function (err, result) {
                    if(err) {
                        callback(err, null);
                        return;
                    }
                    var card = result[0];
                    cineCard = card;
                    callback(null,{ hasCinecard: true, cineCard: cineCard });
                });
            }
        }

    };

    this.addCineCard = function (callback) {
        var num = "";
        for(var i = 0; i < 13 - String(this.id).length; i++) {
            num += "0";
        }
        num += String(this.id);
        FCineCard.addCineCard(num, function (err, result) {
            if (err) {
                callback(err, null);
                return;
            }
            FMember.addCardToMember(id, num, function (err, result) {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(err, result);
            });
        });
    };

    this.getTickets = function (callback) {
        /**
         * Fetch from db
         */
    };

    this.getReservations = function (callback) {
        /**
         * Fetch from db
         */
    };

};

module.exports = Member;