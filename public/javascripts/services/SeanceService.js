/**
 * Created by talha on 24.12.2015.
 */
cinecityApp.factory('SeanceService', function ($q, $http) {
    var factory = {};

    factory.addSeance = function(seance) {
        var deferred = $q.defer();

        $http.post("/api/movie/seance/insert", seance).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    factory.getSeancesByMovie = function (movie) {
        var deferred = $q.defer();
        $http.post("/api/movie/seances", { id: movie.id }).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };


    factory.getSeancesForTicket = function (movie) {
        var deferred = $q.defer();
        $http.post("/api/movie/seances/ticket", { id: movie.id }).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    factory.deleteSeance = function (seance) {
        var deferred = $q.defer();

        $http.post("/api/movie/seance/delete", seance).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };



    return factory;
});