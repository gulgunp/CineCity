/**
 * Created by talha on 8.12.2015.
 */
adminapp.controller('LoginController', function ($scope, AuthUser, $window) {
    $scope.loginData = {};
    $scope.showError = false;
    if(AuthUser.isLoggedin()) {
        AuthUser.getUser().then(function (user) {
            if(user.admin)
                $window.location.href = "/admin/dashboard";
            else
                AuthUser.logout();
        }, function (data) {});
    }
    $scope.login = function () {
        $scope.showError = false;
        AuthUser.login($scope.loginData.email, $scope.loginData.password).then(function (data) {
            console.log("success", data);
            $window.location.href = "/admin/dashboard";
        }, function (data) {
            console.log("fail", data);
            $scope.showError = true;
            $scope.errorMessage = data.message;
        });
    };

});