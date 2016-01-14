/**
 * Created by talha on 22.11.2015.
 */
var DMovie = require("./DMovie");
var FMember = require("./FMember");
var FCampaign = require("./FCampaign");
var FCineCard = require("./FCineCard");
var FCineHall = require("./FCineHall");
var FSeat = require("./FSeat");
var FCineCompany = require("./FCineCompany");
var FCinema = require("./FCinema");
var FOrder = require("./FOrder");
var FProduct = require("./FProduct");
var FReservation = require("./FReservation");
var FSeance = require("./FSeance");
var FTicket = require("./FTicket");


module.exports = {
    Movie: DMovie,
    Member: FMember,
    Campaign: FCampaign,
    CineCard: FCineCard,
    CineHall: FCineHall,
    Seat: FSeat,
    Cinema: FCinema,
    CineCompany: FCineCompany,
    Order: FOrder,
    Product: FProduct,
    Reservation: FReservation,
    Seance: FSeance,
    Ticket: FTicket
};