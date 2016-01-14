/**
 * Created by talha on 7.12.2015.
 */
adminapp.controller("NavigationController", ['$scope', '$rootScope', 'AuthUser', '$window',
    function ($scope, $rootScope, AuthUser, $window) {
    $scope.validUser = false;
    if(AuthUser.isLoggedin()) {
        AuthUser.getUser().then(function (user) {
            if(!user.admin) {
                AuthUser.logout();
                $window.location.href = "/admin";
            } else {
                $scope.validUser = true;
            }
        }, function (data) {
            $window.location.href = "/admin";
        });
    } else {
        $window.location.href = "/admin";
    }

    AuthUser.getUser().then(function (data) {
        $scope.username = data.name;
    });

    $scope.logout = function () {
        AuthUser.logout().then(function (data) {
            if (data.isSet == false) {
                $window.location.href = "/admin";
            }
        })
    }

}]);