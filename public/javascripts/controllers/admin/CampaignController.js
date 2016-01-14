/**
 * Created by talha on 23.12.2015.
 */
adminapp.controller('CampaignController', function ($scope, $rootScope, CampaignService) {
    $scope.campaigns = [];
    $rootScope.currentPage = 4;

    var refresh = function () {
        $scope.campaigns = [];
        CampaignService.getCampaigns().then(function (data) {
            if(data.success == true)
                $scope.campaigns = data.campaigns;
        }, function (data) {
            if(data.success === false)
                alert(data.message);
        });
    };
    setTimeout(function () {
        refresh();
    }, 200);

    $scope.addCampaign = function () {
        CampaignService.addCampaign($scope.newCampaign).then(function (data) {
            if(data.success == true) {
                refresh();
            }
            alert(data.message);
        }, function (data) {
            if(data.success === false)
                alert(data.message);
        });
    };

    $scope.update = function ($index) {
        CampaignService.updateCampaign($scope.campaigns[$index]).then(function (data) {
            if(data.success == true) {
                refresh();
            }
            alert(data.message);
        }, function (data) {
            if(data.success === false)
                alert(data.message);
        });
    };

    $scope.delete = function ($index) {
        CampaignService.deleteCampaign($scope.campaigns[$index]).then(function (data) {
            if(data.success == true) {
                refresh();
            }
            alert(data.message);
        }, function (data) {
            if(data.success === false)
                alert(data.message);
        });
    };
});