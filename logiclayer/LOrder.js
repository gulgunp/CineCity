/**
 * Created by talha on 23.12.2015.
 */
var Order = require("../facade/FOrder");

module.exports = {
    addOrder: function (order, callback) {
        Order.addOrder(order, callback);
    },
    deleteOrder: function (id, callback) {
        Order.deleteOrder(id, callback);
    },
    getOrders: function (memberId, callback) {
        Order.getOrders(memberId, callback);
    },
    updateOrder: function (order, callback) {
        Order.updateOrder(order, callback);
    }
};