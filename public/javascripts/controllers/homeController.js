/**
 * Created by gulgu on 5.12.2015.
 */
cinecityApp.controller('HomeController', ['$scope', "$animate", '$window', '$document', '$sce', 'MovieService', 'SeanceService', 'AuthUser','CampaignService',
    function ($scope, $animate, $window, $document, $sce, MovieService, SeanceService, AuthUser, CampaignService) {

        $scope.userLoggedInText = "Üye Ol/Giriş";
        $scope.userBarUrl = "/register";
        $scope.movies = [];
        $scope.nowShowings = [];
        $scope.futureFilms = [];
        $scope.showedMovies = $scope.movies;
        $scope.teaserTitle = "";
        $scope.currentListPage = 0;
        $scope.navElements = [
            "Vizyondakiler",
            "Tüm Filmler",
            "Gelecek Filmler"
        ];
        $scope.campaigns = [];
        $scope.carouselIndex = 0;
        if(AuthUser.isLoggedin()) {
            $scope.userBarUrl = "/profile";
            $scope.userLoggedInText = "Profilim";
        }

        $scope.showListPage = function ($index) {
            $scope.currentListPage = $index;
            if ($scope.navElements[$index] == "Vizyondakiler") {
                $scope.showedMovies = $scope.nowShowings;
            } else if($scope.navElements[$index] == "Tüm Filmler") {
                $scope.showedMovies = $scope.movies;
            } else if($scope.navElements[$index] == "Gelecek Filmler") {
                $scope.showedMovies = $scope.futureFilms;
            }
        };

        CampaignService.getCampaigns().then(function (data) {
            if(data.success == true) {
                for (var i = 0; i < data.campaigns.length; i++) {
                    if(data.campaigns[i].available == 1)
                        $scope.campaigns.push(data.campaigns[i]);
                }
            }
        }, function (data) {
            $scope.campaigns = [];
        });

        $scope.prevCamp = function () {
            if($scope.carouselIndex - 1 < 0)
                $scope.carouselIndex = $scope.campaigns.length - 1;
            else {
                $scope.carouselIndex -= 1;
            }
        };
        $scope.nextCamp = function () {
            if($scope.carouselIndex + 1 >= $scope.campaigns.length)
                $scope.carouselIndex = 0;
            else {
                $scope.carouselIndex += 1;
            }
        };
        var teaserCount = 0;
        var teaserCurrentIndex = 0;
        var teaserElementArr = [];
        var teaserAnimationEnabled = true;

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
                        for(var i = 0; i < $scope.movies.length; i++) {
                            movie = $scope.movies[i];
                            if(movie.now_showing == 1) {
                                $scope.nowShowings.push(movie);
                            } else if(movie.now_showing == 3) {
                                $scope.futureFilms.push(movie);
                            }
                        }
                        $scope.showedMovies = $scope.nowShowings;
                        $scope.teaserTitle = $scope.nowShowings[0].name;
                        teaserCount = $scope.nowShowings.length;
                        console.log("", $scope.showedMovies);
                        return;
                    }
                }
            }, function (data) {
                if(data.success == false)
                    alert(data.message);
            });
        };

        var loadMovies = function () {
            MovieService.getMovies().then(function (data) {
                if(data.success) {
                    $scope.movies = data.movies;
                    $scope.showedMovies = data.movies;
                    index = 0;
                    filledArray = [];
                    fillSeances();
                }
            }, function (data) {
                if(data.success === false)
                    alert(data.message);
            });
        };

        loadMovies();

        $scope.trustUrl = function (src) {
            return $sce.trustAsResourceUrl(src);
        };

        $scope.goToAllMovies = function(){
            teaserAnimationEnabled = false;
            $document.scrollTo(angular.element(document.querySelector("#navContainer")),0,1000);
        };

        $scope.goToMovie = function () {
            $scope.currentListPage = 0;
            setTimeout(function () {
                teaserAnimationEnabled = false;
                var movieId = $scope.nowShowings[teaserCurrentIndex].id;
                $document.scrollTo(angular.element(document.querySelector("#m" + movieId)), 0, 1000);
            },200);

        };

        var teasers = angular.element(document.querySelector("#tcontainer"));
        var teaserScrollAnimationFinished = true;

        $document.on('scroll', function () {
            if (teaserElementArr.length == 0) {
                for (var i = 0; i < teaserCount; i++) {
                    teaserElementArr.push(angular.element(document.querySelector("#t" + (i + 1))));
                }
            }
            if (teaserAnimationEnabled === true && ((teasers.scrollTop() / 371) + 1) < teaserCount) {
                teaserScrollAnimationFinished = false;
                $document.scrollTop(0, 0);
                var index = Math.floor((teasers.scrollTop() / 371) + 1);
                var t = teaserElementArr[index];
                $scope.teaserTitle = $scope.nowShowings[index].name;
                teasers.duScrollTo(t, 146, 500).then(function () {
                    teaserCurrentIndex = index;
                    teaserScrollAnimationFinished = true;
                });
            }
            if(teaserAnimationEnabled === false) {
                if($document.scrollTop() == 0) {
                    teaserAnimationEnabled = true;
                    var t = teaserElementArr[0];
                    $scope.teaserTitle = $scope.nowShowings[0].name;
                    teaserScrollAnimationFinished = false;
                    teasers.duScrollTo(t, 146, 500).then(function () {
                        teaserScrollAnimationFinished = true;
                        teaserCurrentIndex = 0;
                    });
                }
            }

        });

        var animateUp = function () {
            var container = document.querySelector("#movie-title");
            console.log();
            $animate.animate(angular.element(container),
                {
                    top: "375px"
                },
                {
                    top: "-" + angular.element(container)[0].clientHeight + "px"
                },
                "title-slide-animation"
            ).then(function () {
                animateUp();
            });
        };
        animateUp();

    }]);


