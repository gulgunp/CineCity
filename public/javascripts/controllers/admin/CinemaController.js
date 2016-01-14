/**
 * Created by talha on 23.12.2015.
 */
adminapp.controller('CinemaController', function ($scope, $rootScope, CompaniesService, CinemaService) {
    $scope.cinemas = [];
    $rootScope.currentPage = 2;

    var refresh = function () {
        CompaniesService.getCinemas($scope.cineCompany).then(function (data) {
            if(data.success === false) {
                alert(data.message);
            } else {
                $scope.cinemas = [];
                for(var i = 0; i < data.cinemas.length; i++) {
                    var cinema = data.cinemas[i];
                    $scope.cinemas.push(cinema);
                }
            }
        }, function (data) {
            if(data.success === false) {
                alert(data.message);
            }
        });
    };
    setTimeout(function () {
        refresh();
    }, 200);

    $scope.addCinema = function () {
        $scope.newCinema.cineCompany = $scope.cineCompany.id;
        console.log($scope.newCinema);
        CinemaService.addCinema($scope.newCinema).then(function (data) {
            if(data.success === true) {
                refresh();
            }
            alert(data.message);
        }, function (data) {
            if (data.success === false)
                alert(data.message);
        });
    };

    $scope.update = function ($index) {
        CinemaService.updateCinema($scope.cinemas[$index]).then(function (data) {
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
        CinemaService.deleteCinema($scope.cinemas[$index]).then(function (data) {
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