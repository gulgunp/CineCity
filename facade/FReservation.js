/**
 * Created by talha on 23.12.2015.
 */
var oracledb    = require('oracledb'),
    dbConfig    = require('./dbconfig'),
    numRows     = 50;
oracledb.outFormat = oracledb.OBJECT;
var Reservation = require("../entity/Reservation");
var reservations = [];

function addReservation(reservation, callback) {
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
                p_expire_date: reservation.expireDate,
                p_reservation_date: reservation.reservationDate,
                p_member: reservation.member,
                p_seance: reservation.seance,
                p_seat: reservation.seat,
                p_cine_hall: reservation.cineHall
            };
            connection.execute(
                "BEGIN SP_ADDRESERVATION(:p_expire_date, " +
                ":p_reservation_date," +
                ":p_member," +
                ":p_seance," +
                ":p_seat," +
                ":p_cine_hall); END;",
                bindvars,
                {autoCommit: true},
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        callback(err, null);
                        doRelease(connection);
                        return;
                    }
                    callback(err, result);
                });
        });
}

function deleteReservation(id, callback) {
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
                "BEGIN SP_DELETERESERVATION(:p_id); END;",
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

function getReservations(callback) {
    reservations = [];
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
                "BEGIN SP_GETRESERVATIONS(:cursor); END;",
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

function getReservationsByMovie(movieId, callback) {
    reservations = [];
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
                "BEGIN SP_GETRESERVATIONSBYMOVIE(:p_movie, :cursor); END;",
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

function getReservationsBySeance(seanceId, callback) {
    reservations = [];
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
                p_seance: seanceId,
                cursor: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            };
            connection.execute(
                "BEGIN SP_GETRESERVATIONSBYSEANCE(:p_seance, :cursor); END;",
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

function updateReservation(reservation, callback) {
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
                p_id: reservation.id,
                p_expire_date: reservation.expireDate,
                p_reservation_date: reservation.reservationDate,
                p_member: reservation.member,
                p_seance: reservation.seance,
                p_seat: reservation.seat,
                p_cine_hall: reservation.cineHall
            };
            connection.execute(
                "BEGIN SP_UPDATERESERVATION(" +
                ":p_id," +
                ":p_expire_date, " +
                ":p_reservation_date," +
                ":p_member," +
                ":p_seance," +
                ":p_seat," +
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
    addReservation: addReservation,
    deleteReservation: deleteReservation,
    getReservations: getReservations,
    getReservationsByMovie: getReservationsByMovie,
    getReservationsBySeance: getReservationsBySeance,
    updateReservation: updateReservation
}

function fetchRowsFromRS(connection, resultSet, numRows, callback) {
    resultSet.getRows( // get numRows rows
        numRows,
        function (err, rows) {
            if (err) {
                console.error(err);
                callback(err, reservations);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length === 0) {    // no rows, or no more rows
                callback(err, reservations);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    var newReservation = new Reservation(rows[i]);
                    reservations.push(newReservation);
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