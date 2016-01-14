/**
 * Created by talha on 23.12.2015.
 */
adminapp.controller('CompaniesController', function ($scope, $rootScope, CompaniesService) {
    $rootScope.currentPage = 2;

    $scope.companies = [];
    function refresh() {
        CompaniesService.getCompanies().then(function (data) {
            if (data.success === false) {
                alert(data.message);
            } else {
                $scope.companies = [];
                for(var i = 0; i < data.companies.length; i++) {
                    var company = data.companies[i];
                    $scope.companies.push(company);
                }
            }
        }, function (data) {
            if(data.success === false) {
                alert(data.message);
            }
        });
    }

    refresh();

    $scope.addCompany = function () {

        CompaniesService.addCompany({
            name: $scope.company.name,
            numOfCinema: 0
        }).then(function (data) {
            if(data.success === true) {
                refresh();
            }
            alert(data.message);
        }, function (data) {
            if(data.success === false) {
                alert(data.message);
            }
        });
    }

    $scope.update = function ($index) {
        CompaniesService.updateCompany($scope.companies[$index]).then(function (data) {
            alert(data.message);
        }, function (data) {
            if(data.success === false) {
                alert(data.message);
            }
        });
    };

    $scope.delete = function ($index) {
        CompaniesService.deleteCompany($scope.companies[$index]).then(function (data) {
            if(data.success === true)
                refresh();
            alert(data.message);
        }, function (data) {
            if(data.success === false) {
                alert(data.message);
            }
        });

    };

});