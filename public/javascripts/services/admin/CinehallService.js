/**
 * Created by talha on 23.12.2015.
 */
adminapp.factory('CinehallService', function ($q, $http) {
    var factory = {};

    factory.addCinehall = function(cinehall) {
        var deferred = $q.defer();

        $http.post("/api/company/cinema/cinehall/insert", cinehall).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    factory.getCinehallByCinema = function (cinema) {
        var deferred = $q.defer();

        $http.post("/api/company/cinema/cinehalls", { id: cinema.id }).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    factory.deleteCinehall = function (cinehall) {
        var deferred = $q.defer();

        $http.post("/api/company/cinema/cinehall/delete", { id: cinehall.id }).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    factory.updateCinehall = function (cinehall) {
        var deferred = $q.defer();

        $http.post("/api/company/cinema/cinehall/update", cinehall).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    return factory;
});