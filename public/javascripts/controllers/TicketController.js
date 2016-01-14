/**
 * Created by talha on 25.12.2015.
 */



app.controller("TicketController", function ($scope, AuthUser, $window) {
    if(AuthUser.isLoggedin()) {
        AuthUser.getUser().then(function (user) {
            $window.localStorage.setItem("user", JSON.stringify(user));
        }, function (data) {
            $window.localStorage.removeItem("user");
            $window.location.href = "/register";
        });
    } else {
        $window.localStorage.removeItem("user");
        $window.location.href = "/register";
    }
    AuthUser.getUser().then(function (data) {
        $scope.username = data.name;
    });
});