/**
 * Created by talha on 23.12.2015.
 */
adminapp.controller('CinehallController', function ($scope, $rootScope, CinehallService) {
    $scope.halls = [];
    $rootScope.currentPage = 2;
    var refresh = function () {
        CinehallService.getCinehallByCinema($scope.cinema).then(function (data) {
            if(data.success === true)
                $scope.halls = data.cinehalls;
            console.log($scope.halls);
        }, function (data) {
            if(data.success === false)
                alert(data.message);
        })
    };

    setTimeout(function () {
        refresh();
    }, 300);

    $scope.update = function ($index) {
        CinehallService.updateCinehall($scope.halls[$index]).then(function (data) {
            if(data.success === true) {
                refresh();
            }
            alert(data.message);
        }, function (data) {
            if (data.success === false)
                alert(data.message);
        });
    };

    $scope.addCineHall = function () {
        $scope.newCinehall.cinema = $scope.cinema.id;
        CinehallService.addCinehall($scope.newCinehall).then(function (data) {
            if(data.success === true) {
                refresh();
            }
            alert(data.message);
        }, function (data) {
            if (data.success === false)
                alert(data.message);
        });
    };

    $scope.delete = function ($index) {
        CinehallService.deleteCinehall($scope.halls[$index]).then(function (data) {
            if(data.success === true) {
                refresh();
            }
            alert(data.message);
        }, function (data) {
            if (data.success === false)
                alert(data.message);
        });
    };

});