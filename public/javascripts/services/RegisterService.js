/**
 * Created by talha on 25.12.2015.
 */
cinecityApp.factory('RegisterService', function ($q, $http) {
    var factory = {};

    factory.signUp = function (signUpData) {
        var deferred = $q.defer();

        $http.post("/api/signup", signUpData).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    return factory;
});