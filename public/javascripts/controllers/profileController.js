/**
 * Created by gulgu on 23.12.2015.
 */
cinecityApp.controller('ProfileController', function ($scope, AuthUser, $http, $window) {
    $scope.userDetail = {};
    if(AuthUser.isLoggedin()) {
        AuthUser.getUser().then(function (user) {

            $http.post("/api/member",{id: user.id}).then(function (data) {
                if(data.data.success == true) {
                    $scope.userDetail = data.data.user;
                    console.log($scope.userDetail);
                }
            }, function (data) {
                alert(data.data.message);
                console.log(data.data);
                //$window.location.href = "/register";
            });

        }, function (data) {
            //$window.location.href = "/register";
        });
    } else {
        //$window.location.href = "/register";
    }
    AuthUser.getUser().then(function (data) {
        $scope.username = data.name;
    });

    $scope.addCard = function () {
        $http.post('/api/member/card/insert', {id: $scope.userDetail.id }).then(function (data) {
            if(data.data.success) {
                $window.location.reload();
            }
            console.log(data.data);
        }, function (data) {
            if(data.data.success == false)
                alert(data.data.message);
            console.log(data.data);
        });
    };

    var getCineCardMoney = function () {
        if($scope.userDetail.cineCardId) {

        }
    };
    $scope.logout = function () {
        AuthUser.logout().then(function (data) {
            $window.location.href = "/";
        });
    };
    getCineCardMoney();

});
