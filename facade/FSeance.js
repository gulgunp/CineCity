/**
 * Created by talha on 23.12.2015.
 */
var oracledb    = require('oracledb'),
    dbConfig    = require('./dbconfig'),
    numRows     = 50;
oracledb.outFormat = oracledb.OBJECT;
var Seance = require("../entity/Seance");
var seances = [];

function addSeance(seance, callback) {
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
                p_cine_hall: seance.cineHall,
                p_start_time: seance.startTime,
                p_end_time: seance.endTime,
                p_movie: seance.movie,
                p_date: seance.date
            };
            connection.execute(
                "BEGIN SP_ADDSEANCE(:p_cine_hall, " +
                ":p_start_time," +
                ":p_end_time," +
                ":p_movie," +
                ":p_date); END;",
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

function deleteSeance(id, callback) {
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
                "BEGIN SP_DELETESEANCE(:p_id); END;",
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

function getSeancesForTicket(movieId, callback) {
    var seances = [];
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
                "BEGIN SP_GETSEANCESFORTICKET(:p_movie, :cursor); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        callback(err, null);
                        doRelease(connection);
                        return;
                    }
                    seances = [];
                    fetchRowsFromRSForTicket(connection, result.outBinds.cursor, numRows, callback, seances);
                });
        });
}

function getSeancesByMovie(movieId, callback) {

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
                "BEGIN SP_GETSEANCESBYMOVIE(:p_movie, :cursor); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        callback(err, null);
                        doRelease(connection);
                        return;
                    }
                    seances = [];
                    fetchRowsFromRS(connection, result.outBinds.cursor, numRows, callback);
                });
        });
}

function updateSeance(seance, callback) {
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
                p_id: seance.id,
                p_cine_hall: seance.cineHall,
                p_start_time: seance.startTime,
                p_end_time: seance.endTime,
                p_movie: seance.movie,
                p_date: seance.date
            };
            connection.execute(
                "BEGIN SP_UPDATESEANCE(" +
                ":p_id," +
                ":p_cine_hall, " +
                ":p_start_time," +
                ":p_end_time," +
                ":p_movie," +
                ":p_date); END;",
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

module.exports = {
    addSeance: addSeance,
    deleteSeance: deleteSeance,
    getSeancesByMovie: getSeancesByMovie,
    updateSeance: updateSeance,
    getSeancesForTicket: getSeancesForTicket
};

function fetchRowsFromRS(connection, resultSet, numRows, callback) {
    resultSet.getRows( // get numRows rows
        numRows,
        function (err, rows) {
            if (err) {
                console.error(err);
                callback(err, seances);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length === 0) {    // no rows, or no more rows
                callback(err, seances);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length > 0) {
                for(var i = 0; i < rows.length; i++) {
                    var newSeance = new Seance(rows[i]);
                    seances.push(newSeance);
                }
                fetchRowsFromRS(connection, resultSet, numRows, callback);
            }
        });
}

function fetchRowsFromRSForTicket(connection, resultSet, numRows, callback, seances) {
    resultSet.getRows( // get numRows rows
        numRows,
        function (err, rows) {
            if (err) {
                console.error(err);
                callback(err, seances);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length === 0) {    // no rows, or no more rows
                callback(err, seances);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length > 0) {
                for(var i = 0; i < rows.length; i++) {
                    var newSeance = rows[i];
                    seances.push(newSeance);
                }
                fetchRowsFromRSForTicket(connection, resultSet, numRows, callback, seances);
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