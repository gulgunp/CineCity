/**
 * Created by talha on 23.12.2015.
 */
cinecityApp.factory('CinemaService', function ($q, $http) {
    var factory = {};

    factory.getCinemas = function () {
        var deferred = $q.defer();
        $http.get("/api/cinemas").then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });
        return deferred.promise;
    };

    factory.addCinema = function (cinema) {
        var deferred = $q.defer();
        $http.post("/api/company/cinema/insert", cinema).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });
        return deferred.promise;
    };

    factory.updateCinema = function (cinema) {
        var deferred = $q.defer();
        $http.post('/api/company/cinema/update', cinema).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });
        return deferred.promise;
    };

    factory.deleteCinema = function (cinema) {
        var deferred = $q.defer();
        $http.post('/api/company/cinema/delete', { id: cinema.id }).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });
        return deferred.promise;
    };

    return factory;
});