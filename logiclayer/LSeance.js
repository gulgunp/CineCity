/**
 * Created by talha on 23.12.2015.
 */
var Seance = require("../facade/FSeance");
var _ = require("underscore");

module.exports = {
    addSeance: function (seance, callback) {
        Seance.addSeance(seance, callback);
    },
    deleteSeance: function (id, callback) {
        Seance.deleteSeance(id, callback);
    },
    getSeancesByMovie: function(movieId, callback) {
        Seance.getSeancesByMovie(movieId, callback);
    },
    updateSeance: function (seance, callback) {
        Seance.updateSeance(seance, callback);
    },
    getSeancesForTicket: function (movieId, callback) {
        Seance.getSeancesForTicket(movieId, function (err, result) {
            if(err) {
                callback(err, null);
                return;
            }
            result = _
                .chain(result)
                .groupBy('cinemaId')
                .map(function (value, key) {
                    return {
                        cinemaId: key,
                        cinemaName: value[0].cinemaName,
                        dates: value
                    }
                })
                .value();

            for (var i = 0; i < result.length; i++) {
                var cinema = result[i];
                var dates = cinema.dates;
                dates = _.chain(dates)
                    .groupBy("date")
                    .map(function (value, key) {
                        return {
                            date: new Date(key),
                            seances: value
                        }
                    }).value();
                result[i].dates = dates;
            }
            console.log(JSON.stringify(result));
            callback(err, result);
        });
    }
};