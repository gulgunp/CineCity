/**
 * Created by talha on 25.11.2015.
 */
var bcrypt = require('bcrypt-node');
var logicLayer = require('../logiclayer/logicLayer');
var jsonwebtoken = require("jsonwebtoken");
var secretKey = "bba!s589djASAdtchGp254as55.+44"

function createToken(member) {
    var token = jsonwebtoken.sign({
        id: member.id,
        name: member.name,
        surname: member.surname,
        email: member.email,
        admin: member.admin
    }, secretKey, {
        expiresIn: "24h"
    });
    return token;
}

module.exports = function (app, express) {
    var api = express.Router();

    api.post('/signup', function (request, response) {
        if (typeof request.body.name != 'undefined'
            && typeof request.body.surname != 'undefined'
            && typeof request.body.email != 'undefined'
            && typeof request.body.password != 'undefined'
            && typeof request.body.phone != 'undefined') {
            var newMember = {
                name: request.body.name,
                surname: request.body.surname,
                email: request.body.email,
                phone: request.body.phone,
                password: request.body.password
            };
            logicLayer.Member.addMember(newMember, function (err, result) {
                if (err) {
                    response.status(403).json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                    return;
                }
                response.json({
                    success: true,
                    message: "Member created.."
                });
                return;
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/login', function (request, response) {
        if (typeof request.body.email != 'undefined'
            && typeof request.body.password != 'undefined') {
            logicLayer.Member.authMember({
                email: request.body.email,
                password: request.body.password
            }, function (err, result) {
                if (err) {
                    response.status(403).json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                    return;
                }
                var token = createToken(result);
                response.json({
                    success: true,
                    message: "Successfully logged in.",
                    admin: result.admin,
                    token: token
                });
                return;
            })
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.get('/movies', function (request, response) {
        logicLayer.Movie.getMovies(function (err, results) {
            if (err) {
                response.json({
                    success: false,
                    message: "Veri çekilemedi"
                });
            } else {
                var result = {
                    success: true,
                    movies: results
                };
                response.json(result);
            }
        });
    });

    api.get('/companies', function (request, response) {
        logicLayer.CineCompany.getCineCompanies(function (err, results) {
            if (err) {
                response.json({
                    success: false,
                    message: err.message || "Something went wrong.."
                });
                return;
            }
            var result = {
                success: true,
                companies: results
            };
            response.json(result);
        });
    });

    api.get('/campaigns', function (requset, response) {
        logicLayer.Campaign.getCampaigns(function (err, result) {
            if (err) {
                response.json({
                    success: false,
                    message: err.message || "Something went wrong.."
                });
                return;
            }
            var results = {
                success: true,
                campaigns: result
            };
            response.json(results);
        })
    });

    api.post('/cinehall/seats', function (request, response) {
        if (typeof request.body.id != 'undefined') {
            logicLayer.Seat.getSeatsInCineHall({id: request.body.id}, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        seats: result
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/company/cinema/cinehalls', function (request, response) {
        if (typeof request.body.id != 'undefined') {
            logicLayer.CineHall.getCineHallByCinema(request.body.id, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        cinehalls: result
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.get('/cinemas', function (request, response) {
        logicLayer.Cinema.getCinemas(function (err, result) {
            if (err) {
                response.json({
                    success: false,
                    message: err.message || "Something went wrong.."
                });
            } else {
                response.json({
                    success: true,
                    cinemas: result
                });
            }
        });
    });

    api.post('/company/cinemas', function (request, response) {
        if (typeof request.body.id != 'undefined') {
            logicLayer.CineCompany.getCineCompany(request.body.id, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    var company = result[0];
                    company.getCinemas(function (err, result) {
                        if (err) {
                            response.json({
                                success: false,
                                message: err.message || "Something went wrong.."
                            });
                        } else {
                            response.json({
                                success: true,
                                cinemas: result
                            });
                        }
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/movie/seances', function (request, response) {
        if (typeof request.body.id != 'undefined') {
            logicLayer.Seance.getSeancesByMovie(request.body.id, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        seances: result
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post("/movie/seances/ticket", function (request, response) {
        if (typeof request.body.id != 'undefined') {
            logicLayer.Seance.getSeancesForTicket(request.body.id, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        seances: result
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/seance/seats', function (request, response) {
        if (typeof request.body.cinehallId != 'undefined'
            && typeof request.body.seanceId != 'undefined') {
            logicLayer.Seat.getSeatsWithStateBySeance(request.body.seanceId, request.body.cinehallId, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        seats: result
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post("/ticket/insert", function (request, response) {
        if (typeof request.body.price != 'undefined'
            && typeof request.body.seance != 'undefined'
            && typeof request.body.seat != 'undefined'
            && typeof request.body.member != 'undefined'
            && typeof request.body.cinehall != 'undefined') {

            var ticket = {
                price: request.body.price,
                ticketDate: new Date(),
                seance: request.body.seance,
                seat: request.body.seat,
                member: request.body.member,
                cineHall: request.body.cinehall
            };

            logicLayer.Ticket.addTicket(ticket, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Ticket was successfully inserted."
                    });
                }
            });
        } else {
            response.statue(403).json({
                success: false,
                message: "Invalid request"
            });
        }
    });

    ////////// Needs to be authenticated
    api.use(function (request, response, next) {
        var token = request.body.token || request.params.token || request.headers['x-access-token'];
        if (!token) {
            response.status(403).send({
                success: false,
                message: "No token provided."
            });
        } else {
            jsonwebtoken.verify(token, secretKey, function (err, decoded) {
                if (err) {
                    response.status(403).send({success: false, message: "Invalid Token."});
                } else {
                    request.decoded = decoded;
                    next();
                }
            });
        }
    });

    api.get('/members', function (request, response) {
        logicLayer.Member.getMembers(function (err, results) {
            if (err) {
                response.status(403).json({
                    success: false,
                    message: err.message || "Something went wrong.."
                });
                return;
            }
            response.json({
                success: true,
                members: results
            });
        });
    });

    api.post('/member', function (request, response) {
        console.log(request.body);
        if (request.body.id) {
            logicLayer.Member.getMember(request.body.id, function (err, result) {

                console.log("err", err, "result", result);

                if (err) {
                    response.status(403).json({
                        success: false,
                        message: err.message
                    });
                } else {
                    response.json({
                        success: true,
                        user: result
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request"
            });
        }
    });

    api.post("/member/card/insert", function (request, response) {
        if (typeof request.body.id != 'undefined') {
            logicLayer.Member.addCardToMember(request.body.id, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Card was successfully inserted."
                    });
                }
            });
        } else {
            response.statue(403).json({
                success: false,
                message: "Invalid request"
            });
        }
    });

    api.post('/member/update', function (request, response) {

        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.name != 'undefined'
            && typeof request.body.surname != 'undefined'
            && typeof request.body.id != 'undefined'
            && typeof request.body.cineCardId != 'undefined'
            && typeof request.body.email != 'undefined'
            && typeof request.body.password != 'undefined'
            && typeof request.body.password != 'undefined'
            && typeof request.body.admin != 'undefined'
            && typeof request.body.phone != 'undefined') {
            var newMember = {
                id: request.body.id,
                name: request.body.name,
                surname: request.body.surname,
                email: request.body.email,
                phone: request.body.phone,
                password: request.body.password,
                cineCardId: request.body.cineCardId,
                admin: request.body.admin
            };

            logicLayer.Member.updateMember(newMember, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                    return;
                }
                response.json({
                    success: true,
                    message: "Member updated."
                });
                return;
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/member/delete', function (request, response) {

        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.id != 'undefined') {
            var newMember = {
                id: request.body.id
            };

            logicLayer.Member.deleteMember(newMember.id, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                    return;
                }
                response.json({
                    success: true,
                    message: "Member deleted."
                });
                return;
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.get("/me", function (request, response) {
        response.json({
            success: true,
            user: {
                id: request.decoded.id,
                name: request.decoded.name,
                surname: request.decoded.surname,
                email: request.decoded.email,
                admin: request.decoded.admin
            }

        });
    });

    api.post('/movie/delete', function (request, response) {

        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (request.body.id) {
            logicLayer.Movie.deleteMovie(request.body.id, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Movie was successfully deleted."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Movie's id needs for deletion process."
            });
        }
    });

    api.post('/movie/seance/insert', function (request, response) {

        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.cineHall != 'undefined'
            && typeof request.body.startTime != 'undefined'
            && typeof request.body.movie != 'undefined'
            && typeof request.body.date != 'undefined'
            && typeof request.body.endTime != 'undefined') {

            var seance = {
                cineHall: request.body.cineHall,
                startTime: request.body.startTime,
                endTime: request.body.endTime,
                movie: request.body.movie,
                date: new Date(request.body.date)
            };

            logicLayer.Seance.addSeance(seance, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Seance was successfully inserted."
                    });
                }
            });
        } else {
            response.statue(403).json({
                success: false,
                message: "Invalid request"
            });
        }
    });

    api.post('/movie/seance/delete', function (request, response) {

        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.id != 'undefined') {
            logicLayer.Seance.deleteSeance(request.body.id, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Seance was successfully deleted."
                    });
                }
            });
        } else {
            response.statue(403).json({
                success: false,
                message: "Invalid request"
            });
        }
    });

    api.post('/cinehall/seat/insert', function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.seatCode != 'undefined'
            && typeof request.body.cineHall != 'undefined') {

            var newSeat = {
                seatCode: request.body.seatCode,
                cineHall: request.body.cineHall
            };


            logicLayer.Seat.addSeat(newSeat, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Seat was successfully inserted."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/cinehall/seat/delete', function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }
        console.log(request.body);
        if (typeof request.body.seatCode != 'undefined'
            && typeof request.body.cineHall != 'undefined') {

            var newSeat = {
                seatCode: request.body.seatCode,
                cineHall: request.body.cineHall
            };


            logicLayer.Seat.deleteSeat(newSeat, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Seat was successfully deleted."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/campaign/insert', function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.description != 'undefined'
            && typeof request.body.img != 'undefined'
            && typeof request.body.available != 'undefined') {

            var newCampaign = {
                description: request.body.description,
                img: request.body.img,
                available: request.body.available
            };
            logicLayer.Campaign.addCampaign(newCampaign, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Campaign was successfully inserted."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/campaign/update', function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof  request.body.cmpCode != 'undefined'
            && typeof request.body.description != 'undefined'
            && typeof request.body.img != 'undefined'
            && typeof request.body.available != 'undefined') {

            var newCampaign = {
                cmpCode: request.body.cmpCode,
                description: request.body.description,
                img: request.body.img,
                available: request.body.available
            };
            logicLayer.Campaign.updateCampaign(newCampaign, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Campaign was successfully updated."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/campaign/delete', function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }
        if (typeof request.body.cmpCode != 'undefined') {
            logicLayer.Campaign.deleteCampaign(request.body.cmpCode, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Campaign was successfully deleted."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/company/cinema/cinehall/delete', function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.id != 'undefined') {

            logicLayer.CineHall.deleteCineHall(request.body.id, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Cinehall was successfully deleted."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/company/cinema/cinehall/update', function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.name != 'undefined'
            && typeof request.body.cinema != 'undefined'
            && typeof request.body.numOfSeat != 'undefined'
            && typeof request.body.id != 'undefined') {

            var newCineHall = {
                id: request.body.id,
                name: request.body.name,
                cinema: request.body.cinema,
                numOfSeat: request.body.numOfSeat
            };

            logicLayer.CineHall.updateCineHall(newCineHall, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Cinehall was successfully updated."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/company/cinema/cinehall/insert', function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.cinema != 'undefined'
            && typeof request.body.name != 'undefined') {

            var newCineHall = {
                name: request.body.name,
                cinema: request.body.cinema,
                numOfSeat: 0
            };

            console.log(newCineHall);

            logicLayer.CineHall.addCineHall(newCineHall, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Cinehall was successfully inserted."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/company/cinema/insert', function (request, response) {

        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.name != 'undefined'
            && typeof request.body.cineCompany != 'undefined'
            && typeof request.body.town != 'undefined'
            && typeof request.body.city != 'undefined') {

            var newCinema = {
                name: request.body.name,
                town: request.body.town,
                city: request.body.city,
                cineCompany: request.body.cineCompany,
                numOfHall: 0
            };

            logicLayer.Cinema.addCinema(newCinema, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Cinema was successfully inserted."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }

    });

    api.post('/company/cinema/delete', function (request, response) {

        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.id != 'undefined') {

            logicLayer.Cinema.deleteCinema(request.body.id, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Cinema was successfully deleted."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }

    });

    api.post('/company/cinema/update', function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.name != 'undefined'
            && typeof request.body.cineCompany != 'undefined'
            && typeof request.body.town != 'undefined'
            && typeof request.body.id != 'undefined'
            && typeof request.body.numOfHall != 'undefined'
            && typeof request.body.city != 'undefined') {

            var newCinema = {
                id: request.body.id,
                name: request.body.name,
                town: request.body.town,
                city: request.body.city,
                cineCompany: request.body.cineCompany,
                numOfHall: request.body.numOfHall
            };

            logicLayer.Cinema.updateCinema(newCinema, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Cinema was successfully updated."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }

    });

    api.post("/company/delete", function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.id != 'undefined') {

            logicLayer.CineCompany.deleteCineCompany(request.body.id, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Company was successfully deleted."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }

    });

    api.post("/company/insert", function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.name != 'undefined'
            && typeof request.body.numOfCinema != 'undefined') {
            var newCompany = {
                name: request.body.name,
                numOfCinema: request.body.numOfCinema
            };
            logicLayer.CineCompany.addCineCompany(newCompany, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Company was successfully inserted."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }

    });

    api.post("/company/update", function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }

        if (typeof request.body.id != 'undefined'
            && typeof request.body.name != 'undefined'
            && typeof request.body.numOfCinema != 'undefined') {
            var newCompany = {
                id: request.body.id,
                name: request.body.name,
                numOfCinema: request.body.numOfCinema
            };
            logicLayer.CineCompany.updateCineCompany(newCompany, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Company was successfully updated."
                    });
                }
            });
        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }

    });

    api.post('/movie/insert', function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }
        if (typeof request.body.name != 'undefined'
            && typeof request.body.duration != 'undefined'
            && typeof request.body.imdb != 'undefined'
            && typeof request.body.description != 'undefined'
            && typeof request.body.img != 'undefined'
            && typeof request.body.teaser != 'undefined'
            && typeof request.body.now_showing != 'undefined') {
            var newMovie = {
                name: request.body.name,
                duration: request.body.duration,
                imdb: request.body.imdb,
                description: request.body.description,
                img: request.body.img,
                teaser: request.body.teaser,
                nowShowing: request.body.now_showing
            };
            logicLayer.Movie.addMovie(newMovie, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message || "Something went wrong.."
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Movie was successfully inserted."
                    });
                }
            });

        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    api.post('/movie/update', function (request, response) {
        var permission = request.decoded.admin == 1;
        if (!permission) {
            response.json({
                success: false,
                message: "Permission denied!"
            });
            return;
        }
        if (typeof request.body.id != 'undefined'
            && typeof request.body.name != 'undefined'
            && typeof request.body.duration != 'undefined'
            && typeof request.body.imdb != 'undefined'
            && typeof request.body.description != 'undefined'
            && typeof request.body.img != 'undefined'
            && typeof request.body.teaser != 'undefined'
            && typeof request.body.now_showing != 'undefined'
            && typeof request.body.view_count != 'undefined') {
            var newMovie = {
                id: request.body.id,
                name: request.body.name,
                duration: request.body.duration,
                imdb: request.body.imdb,
                description: request.body.description,
                img: request.body.img,
                teaser: request.body.teaser,
                nowShowing: request.body.now_showing,
                viewCount: request.body.view_count
            };
            logicLayer.Movie.updateMovie(newMovie, function (err, result) {
                if (err) {
                    response.json({
                        success: false,
                        message: err.message
                    });
                } else {
                    response.json({
                        success: true,
                        message: "Movie was successfully updated."
                    });
                }
            });

        } else {
            response.json({
                success: false,
                message: "Invalid request."
            });
        }
    });

    return api;
};