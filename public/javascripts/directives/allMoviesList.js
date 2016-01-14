/**
 * Created by talha on 24.12.2015.
 */
cinecityApp.directive("allMoviesList", function () {
    return {
        restrict: 'E',
        scope: {
            movies: "=data"
        },
        controller: function ($scope) {
            $scope.buyTicket = {};
            $scope.deneme = function () {
                console.log($scope.buyTicket.cinema);
            };
            $scope.showTicketView = function (id) {
                var content = angular.element(document.querySelector("#tva" + id));
                content.addClass("showTicketView");
            };

            $scope.closeTicketView = function (id) {
                var content = angular.element(document.querySelector("#tva" + id));
                content.removeClass("showTicketView");
            }
        },
        templateUrl: "/javascripts/templates/all_movies_list.html",
        link: function (scope, element, attr) {

        }
    }
});