/**
 * Created by talha on 24.12.2015.
 */
cinecityApp.directive("nowShowingList", function () {
    return {
        restrict: 'E',
        scope: {
            movies: "=data"
        },
        controller: function ($scope, $rootScope, CinemaService) {

            $rootScope.cinemas = [];
            $scope.buyTicket = {};

            var loadCinemas = function () {
                CinemaService.getCinemas().then(function (data) {
                    if(data.success) {
                        $rootScope.cinemas = data.cinemas;
                    }
                }, function (data) {
                    if(data.success === false) {
                        alert(data.message);
                    }
                });
            };
            loadCinemas();

            $scope.deneme = function () {
                console.log($scope.buyTicket.cinema);
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
        templateUrl: "/javascripts/templates/now_showing_list.html",
        link: function (scope, element, attr) {

        }
    }
});