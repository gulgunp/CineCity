/**
 * Created by talha on 23.12.2015.
 */
adminapp.factory('SeatService', function ($q, $http) {
    var factory = {};

    factory.addSeat = function(seat) {
        var deferred = $q.defer();

        $http.post("/api/cinehall/seat/insert", seat).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    factory.getSeatsByCinehall = function (cinehall) {
        var deferred = $q.defer();

        $http.post("/api/cinehall/seats", { id: cinehall.id }).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    factory.deleteSeat = function (seat) {
        var deferred = $q.defer();

        $http.post("/api/cinehall/seat/delete", seat).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };



    return factory;
});