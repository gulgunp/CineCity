/**
 * Created by talha on 7.12.2015.
 */
adminapp.controller('DashboardController', ['$scope', '$rootScope', 'AuthUser', '$window', function ($scope, $rootScope, AuthUser, $window) {
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
    $rootScope.currentPage = 1;
}]);