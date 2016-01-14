/**
 * Created by talha on 22.12.2015.
 */

var Order = function (obj) {
    this.id = obj.ID || obj.id || -1;
    this.orderDate = obj.ORDER_DATE || obj.order_date;
    this.address = obj.ADDRESS || obj.address;
    this.cost = obj.COST || obj.cost;
    this.member = obj.MEMBER || obj.member;
    this.quantity = obj.QUANTITY || obj.quantity || 1;
    this.product = obj.PRODUCT || obj.product;
    var PRODUCT = null;
    var MEMBER = null;

    this.getProduct = function (callback) {
        /**
         * Fetch from db
         */
    };

    this.getMember = function (callback) {
        /**
         * Fetch from db
         */
    }

};

module.exports = Order;