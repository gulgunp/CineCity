/**
 * Created by talha on 25.12.2015.
 */
cinecityApp.controller('RegisterController', function ($scope, AuthUser, $window, RegisterService) {
    $scope.loginData = {};
    $scope.showError = false;
    if(AuthUser.isLoggedin()) {
        $window.location.href = "/profile";
    }
    $scope.login = function () {
        $scope.showError = false;
        AuthUser.login($scope.loginData.email, $scope.loginData.password).then(function (data) {
            $window.location.href = "/";
        }, function (data) {
            $scope.showError = true;
            $scope.errorMessage = data.message;
        });
    };
    $scope.registerError = "";
    $scope.register = function () {
        RegisterService.signUp($scope.registerData).then(function (data) {
            if(data.success == true) {
                AuthUser.login($scope.registerData.email, $scope.registerData.password).then(function (data) {
                    $window.location.href = "/";
                }, function (data) {
                    alert(data.message);
                });
            }
        }, function (data) {
            $scope.registerError = data.message;
        });

    }

});