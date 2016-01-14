/**
 * AuthService Module
 *
 * Description
 */


app.factory('AuthUser', ['$http', '$q', 'AuthToken', function($http, $q, AuthToken){
    var authFactory = {};

    authFactory.login = function(email, password) {
        var deferred = $q.defer();
        $http.post('/api/login', {
            email: email,
            password: password
        }).then(function(data){
            AuthToken.setToken(data.data.token);
            deferred.resolve(data.data);
        }, function(data){
            deferred.reject(data.data);
        });
        return deferred.promise;
    };

    authFactory.getUser = function () {
        var deferred = $q.defer();
        $http.get("/api/me").then(function (data) {
            deferred.resolve(data.data.user);
        }, function (data) {
            deferred.reject(data.data);
        });
        return deferred.promise;
    };

    authFactory.logout = function() {
        return AuthToken.setToken();
    };

    authFactory.isLoggedin = function () {
        if (AuthToken.getToken()) {
            return true;
        } else {
            return false;
        }
    };


    return authFactory;
}]);

app.factory('AuthToken', ['$window', "$q", function($window, $q){
    var tokenFactory = {};

    tokenFactory.getToken = function () {
        return $window.localStorage.getItem('token');
    };

    tokenFactory.setToken = function(token) {
        var deferred = $q.defer();
        var data = {};
        if (token) {
            $window.localStorage.setItem("token", token);
            data.isSet = true;
            deferred.resolve(data);
        } else {
            $window.localStorage.removeItem("token");
            data.isSet = false;
            deferred.resolve(data);
        }
        return deferred.promise;
    };

    return tokenFactory;
}]);
app.factory('AuthInter', function($q, $location, AuthToken){

    var request = function (config) {
        var token = AuthToken.getToken();
        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    };

    var responseError = function(response) {
        if (response.status == 403) {
            $location.path("/");
        }
        return $q.reject(response);
    };
    return {
        request: request,
        responseError: responseError
    };

});
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInter');
}]);