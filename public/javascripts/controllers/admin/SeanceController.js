/**
 * Created by talha on 24.12.2015.
 */
adminapp.controller('SeanceController', function ($scope, $rootScope, SeanceService, MovieService, CinemaService, CinehallService) {
    $scope.movies = [];
    $scope.cinemas = [];
    $scope.halls = [];
    $rootScope.currentPage = 6;
    var index = 0;
    var filledArray = [];
    var fillSeances = function () {
        var movie = $scope.movies[index];
        SeanceService.getSeancesByMovie(movie).then(function (data) {
            if(data.success == true) {
                movie.seances = data.seances;
                filledArray.push(movie);
                index++;
                if($scope.movies.length > index) {
                    fillSeances();
                    return;
                } else {
                    $scope.movies = [];
                    for(var i = 0; i < filledArray.length; i++) {
                        $scope.movies.push(filledArray[i]);
                    }
                    console.log($scope.movies);
                    return;
                }
            }
        }, function (data) {
            if(data.success == false)
                alert(data.message);
        });
    };

    var refresh = function () {
        $scope.movies = [];
        MovieService.getMovies().then(function (data) {
            if(data.success) {
                $scope.movies = data.movies;
                index = 0;
                filledArray = [];
                fillSeances();
            }
        }, function (data) {
            if(data.success === false)
                alert(data.message);
        });
    };

    var getCinemas = function () {
        CinemaService.getCinemas().then(function (data) {
            if(data.success === true){
                $scope.cinemas = data.cinemas;
            } else {
                alert(data.message);
            }
        }, function (data) {
            if(data.success === false)
                alert(data.message);
        })
    };

    refresh();
    getCinemas();
    $scope.select = {};
    $scope.select.movie = function () {


    };

    $scope.select.cinema = function () {
        CinehallService.getCinehallByCinema({id: $scope.newSeance.cinema}).then(function (data) {
            if(data.success === true){
                $scope.halls = data.cinehalls;
            } else {
                alert(data.message);
            }
        }, function (data) {
            if(data.success === false)
                alert(data.message);
        });
    };

    $scope.addSeance = function () {
        SeanceService.addSeance($scope.newSeance).then(function (data) {
            if(data.success) {
                refresh();
            }
            alert(data.message);
        }, function (data) {
            if(data.success == false)
                alert(data.message);
        });
    };

    $scope.delete = function (seance) {
        SeanceService.deleteSeance(seance).then(function (data) {
            if(data.success) {
                refresh();
            }
            alert(data.message);
        }, function (data) {
            if(data.success == false)
                alert(data.message);
        });
    };
});