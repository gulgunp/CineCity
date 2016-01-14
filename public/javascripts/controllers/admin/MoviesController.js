/**
 * Created by talha on 26.11.2015.
 */
adminapp.controller('MoviesController', ['$scope', 'MovieService', '$rootScope', 'AuthUser', '$window',
    function ($scope, MovieService, $rootScope, AuthUser, $window) {
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

    $rootScope.modalMovie = {name: "denem"};
    $rootScope.modalShow = false;
    $rootScope.currentPage = 3;
    $scope.movies = [];
    function refreshMovies() {
        $scope.movies = [];
        MovieService.getMovies().then(function(data) {
            console.log(data);
            if(data.success === true) {
                $scope.movies = data.movies;
                $rootScope.modalMovie = $scope.movies[0];
            }
        },function(data) {
            console.log(data);
        });
    };

    $rootScope.addMovieFromModal = function() {
        refreshMovies();
    };

    refreshMovies();

    $scope.update = function($index) {
        $rootScope.modalMovie = $scope.movies[$index];
        $rootScope.modalMovieTitle = "Update Movie";
        $rootScope.modalShow = true;
    };

    $scope.insert = function () {
        $rootScope.modalMovie = {};
        $rootScope.modalMovieTitle = "Add Movie";
        $rootScope.modalShow = true;

        /*
        var movie = {
            name : "deneme",
            duration : 144,
            imdb: 7.3,
            description : "denemedenemedeneme deneem ndnemmf",
            img:"sdfghjkdghfghjk",
            teaser: "sfdrggkjfgfjdg",
            now_showing: 0
        };
        MovieService.insertMovie(movie).then(function (data) {
            if(data.success === false){
                console.log(data);
                alert("Insert failed");
            }else{
                refreshMovies();
            }
        }, function (data) {
            console.log(data);
            alert("Insert failed");
        });
        */
    };

    $scope.delete = function($index) {
        MovieService.deleteMovie($scope.movies[$index].id).then(function (data) {
            if(data.success === false) {
                alert("Delete process failed!!");
            } else {
                $scope.movies.splice($index,1);
            }
        }, function (data) {
            alert("Delete process failed!!");
        });

    };
}]);