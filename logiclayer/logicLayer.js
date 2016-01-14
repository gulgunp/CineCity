/**
 * Created by talha on 7.12.2015.
 */

var LMovie = require("./LMovie");
var LMember = require('./LMember');
var LCampaign = require('./LCampaign');
var LCineCard = require('./LCineCard');
var LCineCompany = require('./LCineCompany');
var LCineHall = require('./LCineHall');
var LCinema = require('./LCinema');
var LOrder = require('./LOrder');
var LProduct = require('./LProduct');
var LReservation = require('./LReservation');
var LSeance = require('./LSeance');
var LSeat = require('./LSeat');
var LTicket = require('./LTicket');

module.exports = {
    Movie: LMovie,
    Member: LMember,
    Campaign: LCampaign,
    CineCard: LCineCard,
    CineCompany: LCineCompany,
    CineHall: LCineHall,
    Cinema: LCinema,
    Order: LOrder,
    Product: LProduct,
    Reservation: LReservation,
    Seance: LSeance,
    Seat: LSeat,
    Ticket: LTicket

};