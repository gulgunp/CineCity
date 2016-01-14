/**
 * Created by talha on 23.12.2015.
 */
adminapp.factory('CampaignService', function ($q, $http) {
    var factory = {};

    factory.getCampaigns = function () {
        var deferred = $q.defer();

        $http.get("/api/campaigns").then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    factory.updateCampaign = function (campaign) {
        var deferred = $q.defer();
        $http.post("/api/campaign/update", campaign).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    factory.deleteCampaign = function (campaign) {
        var deferred = $q.defer();
        $http.post("/api/campaign/delete", { cmpCode: campaign.cmpCode }).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    factory.addCampaign = function (campaign) {
        var deferred = $q.defer();
        $http.post("/api/campaign/insert", campaign).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    return factory;
});