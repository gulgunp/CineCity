/**
 * Created by talha on 22.12.2015.
 */

var Product = function (obj) {
    this.id = obj.ID || obj.id || -1;
    this.name = obj.NAME || obj.name;
    this.price = obj.PRICE || obj.price;
    this.description = obj.DESCRIPTION || obj.description;
    this.img = obj.IMG || obj.img;
    this.stock = obj.STOCK || obj.stock;
};

module.exports = Product;