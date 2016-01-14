/**
 * Created by talha on 24.12.2015.
 */
cinecityApp.directive("movie", function () {
    return {
        restrict: 'E',
        scope: {
            movie: "=data"
        },
        controller: function ($scope, SeanceService, $window) {
            $scope.buyTicket = {};
            $scope.seances = [];
            $scope.selectedCinema = null;
            $scope.selectedDate = null;
            var loadSeances = function () {
                SeanceService.getSeancesForTicket($scope.movie).then(function (data) {
                    if(data.success) {
                        $scope.seances = data.seances;
                        console.log($scope.seances);
                    }
                }, function (data) {
                    if(data.success == false)
                        alert(data.message);
                });
            };
            setTimeout(function () {
                loadSeances();
            }, 2000);

            $scope.selectCinema = function () {
                $scope.selectedDate = null;
                $scope.buyTicket.date = null;
                for(var i = 0; i < $scope.seances.length; i++) {
                    if($scope.seances[i].cinemaId == $scope.buyTicket.cinema) {
                        $scope.selectedCinema = $scope.seances[i];
                    }
                }
            };
            $scope.buyTicket = function () {
                if($scope.selectedDate != null && $scope.buyTicket.seance != null) {
                    var seance = $scope.selectedDate.seances[$scope.buyTicket.seance];
                    $window.location.href = "/buyticket?cinehall=" + seance.cinehallId + "&seance=" + seance.seanceId;
                }
            };
            $scope.selectDate = function () {
                $scope.selectedDate = $scope.selectedCinema.dates[$scope.buyTicket.date];
                $scope.buyTicket.seance = null;
            };
            $scope.showTicketView = function (id) {
                var content = angular.element(document.querySelector("#tv" + id));
                content.addClass("showTicketView");
            };

            $scope.closeTicketView = function (id) {
                var content = angular.element(document.querySelector("#tv" + id));
                content.removeClass("showTicketView");
            }
        },
        templateUrl: "/javascripts/templates/movie.html",
        link: function (scope, element, attr) {
            console.log(scope.product);
            element.bind("mouseover", function () {
                var content = angular.element(element.children().children().children()[1]);
                content.addClass("animateUp");
            });
            element.bind("mouseleave", function () {
                var content = angular.element(element.children().children().children()[1]);
                content.removeClass("animateUp");
            })
        }
    }
});