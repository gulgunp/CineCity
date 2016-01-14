/**
 * Created by talha on 8.12.2015.
 */
adminapp.controller('MembersController', ['$scope', 'AuthUser', '$window', '$rootScope', 'MembersService',
    function ($scope, AuthUser, $window, $rootScope, MembersService) {
    $scope.validUser = false;
    $scope.members = [];
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
    $rootScope.currentPage = 5;

    var refreshMembers = function () {
        MembersService.getMembers().then(function (data) {
            if(data.success === true) {
                $scope.members = data.members;
            } else {
                alert(data.message);
            }
        }, function (data) {
            alert(data.message);
        });

    };
    refreshMembers();
    $scope.update = function($index) {
        MembersService.updateMember($scope.members[$index]).then(function (data) {
            if(data.success == true) {
                refreshMembers();
            }
            alert(data.message);
        }, function (data) {
            if(data.success === false)
                alert(data.message);
        });
    };


    $scope.delete = function($index) {

        MembersService.deleteMember($scope.members[$index]).then(function (data) {
            if(data.success == true) {
                refreshMembers();
            }
            alert(data.message);
        }, function (data) {
            if(data.success === false)
                alert(data.message);
        });

    };
}]);