/**
 * Created by talha on 27.11.2015.
 */
adminapp.directive('adminMovieModal', function($rootScope,$compile){
    return {
        restrict: 'E',
        scope: {
            data: '=',
            title: '='
        },
        replace: true,
        transclude: true,
        link: function (scope, element, attrs) {
            attrs.$observe("data", function(value) {
                scope.data = value;
                scope.movie = scope.data;
            });
            attrs.$observe('title', function(value) {
                scope.title = value;
            });

        },
        controller: ['$scope', '$rootScope', 'MovieService', function($scope, $rootScope, MovieService) {

            $scope.hideModal = function(){
                $rootScope.modalShow = false;
            };

            $scope.addUpdate = function () {
                $scope.data.imdb = parseFloat($scope.data.imdb);
                if($scope.title == "Add Movie") {
                    if(!$scope.data.now_showing) {
                        $scope.data.now_showing = 0;
                    }
                    MovieService.insertMovie($scope.data).then(function(data){
                        if(data.success === true){
                            alert("Movie Inserted");
                            $rootScope.addMovieFromModal();
                        }else if(data.success=== false){
                            console.log(data);
                            alert("Insert Failed!!");
                        }
                    },function (data){
                        alert("Insert Failed!!");
                    });
                } else if($scope.title == "Update Movie") {
                    MovieService.updateMovie($scope.data).then (function (data) {
                        if(data.success === true){
                            alert("Update process succesfull");
                        }else if(data.success === false){
                            console.log(data);
                            alert("Update Failed!!!");
                        }
                    }, function (data) {
                        console.log(data);
                        alert("Update Failed!!!");
                    });
                }

                //MovieService.insertMovie($scope.data);
            };

            $scope.check = function(){
                if($scope.data.now_showing == 1) {
                    $scope.data.now_showing = 0;
                } else {
                    $scope.data.now_showing = 1;
                }

            }


        }],
        templateUrl: '/javascripts/partials/admin-movie-modal.html'
    };
});