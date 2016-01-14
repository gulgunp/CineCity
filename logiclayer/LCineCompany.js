/**
 * Created by talha on 23.12.2015.
 */
var CineCompany = require("../facade/FCineCompany");

module.exports = {
    addCineCompany: function (cineCompany, callback) {
        CineCompany.addCineCompany(cineCompany, callback);
    },
    deleteCineCompany: function(id, callback) {
        CineCompany.deleteCineCompany(id, callback);
    },
    getCineCompany: function (id, callback) {
        CineCompany.getCineCompany(id, callback);
    },
    getCineCompanies: function (callback) {
        CineCompany.getCineCompanies(callback);
    },
    updateCineCompany: function (cineCompany, callback) {
        CineCompany.updateCineCompany(cineCompany, callback);
    }
};