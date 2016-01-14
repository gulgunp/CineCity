/**
 * Created by talha on 21.12.2015.
 */
var CineCard = require("../facade/FCineCard");

module.exports = {
    addCineCard: function(cardNumber, callback) {
        CineCard.addCineCard(cardNumber, callback);
    },
    getCineCard: function (cardNumber, callback) {
        CineCard.getCineCard(cardNumber, callback);
    },
    getCineCardByMember: function (memberId, callback) {
        CineCard.getCineCardByMember(memberId, callback);
    },
    deleteCineCard: function (cardNumber, callback) {
        CineCard.deleteCineCard(cardNumber, callback);
    },
    updateCineCard: function (cineCard, callback) {
        CineCard.updateCineCard(cineCard, callback);
    }
};