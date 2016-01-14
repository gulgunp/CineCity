/**
 * Created by talha on 26.11.2015.
 */
var Movie = require("../facade/DMovie");

module.exports = {
    getMovie: function (id, callback) {
        Movie.getMovie(id, callback);
    },
    getMovies: function(movies) { //Movies is a function with (err,results)
        Movie.getMovies(movies);
    },
    addMovie: function (movie, callback) {
        Movie.addMovie(movie, callback);
    },
    deleteMovie: function (id, callback) {
        Movie.deleteMovie(id, callback);
    },
    getMostViewedMovie: function (callback) {
        Movie.getMostViewed(callback);
    },
    updateMovie: function (movie, callback) {
        Movie.updateMovie(movie,callback);
    }
};