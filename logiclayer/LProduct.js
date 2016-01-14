/**
 * Created by talha on 23.12.2015.
 */
var Product = require("../facade/FProduct");

module.exports = {
    addProduct: function (product, callback) {
        Product.addProduct(product, callback);
    },
    deleteProduct: function (id, callback) {
        Product.deleteProduct(id, callback);
    },
    getProduct: function (id, callback) {
        Product.getProduct(id, callback);
    },
    getProducts: function (callback) {
        Product.getProducts(callback);
    },
    updateProduct: function (product, callback) {
        Product.updateProduct(product, callback);
    }
};