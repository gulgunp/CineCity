/**
 * Created by talha on 8.12.2015.
 */
var CineCard = function (obj) {
    this.cardNumber = obj.card_number || obj.CARD_NUMBER || -1;
    this.cineMoney = obj.cine_money || obj.CINE_MONEY || 0;
};

module.exports= CineCard;