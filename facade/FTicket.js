/**
 * Created by talha on 23.12.2015.
 */
var oracledb    = require('oracledb'),
    dbConfig    = require('./dbconfig'),
    numRows     = 50;
oracledb.outFormat = oracledb.OBJECT;
var Ticket = require("../entity/Ticket");
var tickets = [];

function addTicket(ticket, callback) {
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bindvars = {
                p_price: ticket.price,
                p_ticket_date: ticket.ticketDate,
                p_seance: ticket.seance,
                p_seat: ticket.seat,
                p_member: ticket.member,
                p_cine_hall: ticket.cineHall
            };
            connection.execute(
                "BEGIN SP_ADDTICKET(:p_price, " +
                ":p_ticket_date," +
                ":p_seance," +
                ":p_seat," +
                ":p_member," +
                ":p_cine_hall); END;",
                bindvars,
                { autoCommit: true },
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        callback(err, null);
                        doRelease(connection);
                        return;
                    }
                    callback(err,result);
                });
        });
}

function deleteTicket(id, callback) {
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bindvars = {
                p_id: id
            };

            connection.execute(
                "BEGIN SP_DELETETICKET(:p_id); END;",
                bindvars,
                { autoCommit: true },
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        callback(err,result);
                        return;
                    }
                    callback(err,result);
                });
        });
}

function getTickets(callback) {
    tickets = [];
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bindvars = {
                cursor: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            };
            connection.execute(
                "BEGIN SP_GETTICKETS(:cursor); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        callback(err, null);
                        doRelease(connection);
                        return;
                    }
                    fetchRowsFromRS(connection, result.outBinds.cursor, numRows, callback);
                });
        });
}

function getTicketsForMovie(movieId, callback) {
    tickets = [];
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bindvars = {
                p_movie: movieId,
                cursor: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            };
            connection.execute(
                "BEGIN SP_GETTICKETSFORMOVIE(:p_movie, :cursor); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        callback(err, null);
                        doRelease(connection);
                        return;
                    }
                    fetchRowsFromRS(connection, result.outBinds.cursor, numRows, callback);
                });
        });
}

function updateTicket(ticket, callback) {
    SP_UPDATETICKET
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bindvars = {
                p_id: ticket.id,
                p_price: ticket.price,
                p_ticket_date: ticket.ticketDate,
                p_seance: ticket.seance,
                p_seat: ticket.seat,
                p_member: ticket.member,
                p_cine_hall: ticket.cineHall
            };
            connection.execute(
                "BEGIN SP_UPDATETICKET(" +
                ":p_id," +
                ":p_price, " +
                ":p_ticket_date," +
                ":p_seance," +
                ":p_seat," +
                ":p_member," +
                ":p_cine_hall); END;",
                bindvars,
                {autoCommit: true},
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        callback(err, result);
                        return;
                    }
                    callback(err, result);
                });
        });
}

module.exports = {
    addTicket: addTicket,
    deleteTicket: deleteTicket,
    getTickets: getTickets,
    getTicketsForMovie: getTicketsForMovie,
    updateTicket: updateTicket
};

function fetchRowsFromRS(connection, resultSet, numRows, callback) {
    resultSet.getRows( // get numRows rows
        numRows,
        function (err, rows) {
            if (err) {
                console.error(err);
                callback(err, tickets);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length === 0) {    // no rows, or no more rows
                callback(err, tickets);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length > 0) {
                for(var i = 0; i < rows.length; i++) {
                    var newTicket = new Ticket(rows[i]);
                    tickets.push(newTicket);
                }
                fetchRowsFromRS(connection, resultSet, numRows, callback);
            }
        });
}

function doRelease(connection) {
    connection.release(
        function (err) {
            if (err) {
                console.error(err.message);
            }
        });
}

function doClose(connection, resultSet) {
    resultSet.close(
        function (err) {
            if (err) {
                console.error(err.message);
            }
            doRelease(connection);
        });
}