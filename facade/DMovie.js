/**
 * Created by talha on 25.11.2015.
 */
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var Movie = require('../entity/Movie');
var numRows = 50;  // number of rows to return from each call to getRows()
var movies = [];

var getMovies = function(movieResult) {
    movies = [];
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
                "BEGIN SP_GETMOVIES(:cursor); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    fetchRowsFromRS(connection, result.outBinds.cursor, numRows, movieResult);
                });
        });
};

function deleteMovie(id, callback) {
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
                "BEGIN SP_DELETEMOVIE(:p_id); END;",
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
                    console.log(JSON.stringify(result) + " Movie deleted.");
            });
    });
};

function updateMovie(movie, callback) {
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
                p_id: movie.id,
                p_name: movie.name,
                p_duration: movie.duration,
                p_imdb: movie.imdb,
                p_description: movie.description,
                p_img: movie.img,
                p_teaser: movie.teaser,
                p_now_showing: movie.now_showing,
                p_view_count: movie.view_count
            };
            connection.execute(
                "BEGIN SP_UPDATEMOVIE(" +
                "       :p_id," +
                "       :p_name, " +
                "       :p_duration, " +
                "       :p_imdb," +
                "       :p_description," +
                "       :p_img," +
                "       :p_teaser," +
                "       :p_now_showing," +
                "       :p_view_count); END;",
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
                    console.log(result.rowsAffected + " Movie updated.");
            });
        });
};

function getMovie(id, callback) {
    movies = [];
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
                p_id: id,
                cursor: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            };
            connection.execute(
                "BEGIN SP_GETMOVIE(:p_id,:cursor); END;",
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
};

function addMovie(movie, callback) {
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
                p_name: movie.name,
                p_duration: movie.duration,
                p_imdb: movie.imdb,
                p_description: movie.description,
                p_img: movie.img,
                p_teaser: movie.teaser,
                p_now_showing: movie.now_showing
            };

            connection.execute(
                "BEGIN SP_ADDMOVIE(:p_name, " +
                "       :p_duration, " +
                "       :p_imdb," +
                "       :p_description," +
                "       :p_img," +
                "       :p_teaser," +
                "       :p_now_showing); END;",
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
                    console.log(result.rowsAffected + " Movie inserted.");
            });
    });
};
function getMostViewedMovie(movie) {//Movie is a function
    movies = [];
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
                "BEGIN SP_GETMOSTWATCHEDMOVIE(:cursor); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        movie(err, null);
                        doRelease(connection);
                        return;
                    }
                    fetchRowsFromRS(connection, result.outBinds.cursor, numRows, movie);
                });
        });
};

module.exports = {
    getMovie: getMovie,
    getMovies: getMovies,
    getMostViewed: getMostViewedMovie,
    addMovie: addMovie,
    deleteMovie: deleteMovie,
    updateMovie: updateMovie
};

function fetchRowsFromRS(connection, resultSet, numRows, movieResult) {
    resultSet.getRows( // get numRows rows
        numRows,
        function (err, rows) {
            if (err) {
                console.log(err);
                movieResult(err, movies);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length === 0) {    // no rows, or no more rows
                movieResult(err, movies);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length > 0) {
                for(var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    var newMovie = new Movie( {
                        id: row.ID,
                        name: row.NAME,
                        duration: row.DURATION,
                        imdb: row.IMDB,
                        description: row.DESCRIPTION,
                        img: row.IMG,
                        teaser: row.TEASER,
                        now_showing: row.NOW_SHOWING,
                        view_count: row.VIEW_COUNT
                    });
                    movies.push(newMovie);
                }
                fetchRowsFromRS(connection, resultSet, numRows, movieResult);
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
