/**
 * Created by talha on 23.12.2015.
 */
var Ticket = require("../facade/FTicket");

module.exports = {
    addTicket: function (ticket, callback) {
        Ticket.addTicket(ticket, callback);
    },
    deleteTicket: function (id, callback) {
        Ticket.deleteTicket(id, callback);
    },
    getTickets: function (callback) {
        Ticket.getTickets(callback);
    },
    getTicketsForMovie: function (movieId, callback) {
        Ticket.getTicketsForMovie(movieId, callback);
    },
    updateTicket: function (ticket, callback) {
        Ticket.updateTicket(ticket, callback);
    }
};