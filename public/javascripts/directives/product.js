/**
 * Created by gulgu on 19.12.2015.
 */
cinecityApp.directive("product", function () {
    return {
        restrict: 'E',
        scope: {
            product: "=data"
        },
        templateUrl: "/javascripts/templates/product.html",
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