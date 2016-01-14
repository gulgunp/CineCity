/**
 * Created by talha on 22.12.2015.
 */
var oracledb    = require('oracledb'),
    dbConfig    = require('./dbconfig'),
    numRows     = 50;
oracledb.outFormat = oracledb.OBJECT;
var Seat = require("../entity/Seat");
var seats = [];

function addSeat(seat, callback) {
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
                p_seat_code: seat.seatCode,
                p_cine_hall: seat.cineHall
            };
            connection.execute(
                "BEGIN SP_ADDSEAT(:p_seat_code, :p_cine_hall); END;",
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
                    console.log("Seat added.");
                });
        });
}

function deleteSeat(seat, callback) {
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
                p_seat_code: seat.seatCode,
                p_cine_hall: seat.cineHall
            };

            connection.execute(
                "BEGIN SP_DELETESEAT(:p_seat_code, :p_cine_hall); END;",
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
                    console.log("Seat deleted.");
                });
        });
}

function getSeatsInCineHall(cineHall, callback) {
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
                p_cinehall: cineHall.id,
                cursor: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            };
            connection.execute(
                "BEGIN SP_GETSEATSINCINEHALL(:p_cinehall, :cursor); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        callback(err, null);
                        doRelease(connection);
                        return;
                    }
                    seats = [];
                    fetchRowsFromRS(connection, result.outBinds.cursor, numRows, callback);
                });
        });
}

function getFullSeatsBySeance(seanceId, callback) {
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
                "BEGIN SP_GETFULLSEATS(:p_seance, :cursor); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        callback(err, null);
                        doRelease(connection);
                        return;
                    }
                    seats = [];
                    fetchRowsFromRS(connection, result.outBinds.cursor, numRows, callback);
                });
        });
}

function getEmptySeatCountForSeance(seance, callback) {
    seats = [];
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
                p_seance: seance.id,
                count: {type: oracledb.NUMBER, dir: oracledb.BIND_OUT}
            };
            connection.execute(
                "BEGIN SP_GETEMPTYSEATSFORSEANCE(:p_seance, :count); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        callback(err, null);
                        doRelease(connection);
                        return;
                    }
                    console.log("empty seats: ",result);
                });
        });
}

module.exports = {
    addSeat: addSeat,
    deleteSeat: deleteSeat,
    getSeatsInCineHall: getSeatsInCineHall,
    getEmptySeatCountForSeance: getEmptySeatCountForSeance,
    getFullSeatsBySeance: getFullSeatsBySeance
};

function fetchRowsFromRS(connection, resultSet, numRows, callback) {
    resultSet.getRows( // get numRows rows
        numRows,
        function (err, rows) {
            if (err) {
                console.error(err);
                callback(err, seats);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length === 0) {    // no rows, or no more rows
                callback(err, seats);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length > 0) {
                for(var i = 0; i < rows.length; i++) {
                    var newSeat = new Seat(rows[i]);
                    seats.push(newSeat);
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