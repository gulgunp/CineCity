/**
 * Created by talha on 23.12.2015.
 */
adminapp.factory('CompaniesService', function ($q, $http) {
    var factory = {};
    factory.getCompanies = function () {
        var deferred = $q.defer();
        $http.get("/api/companies").then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });
        return deferred.promise;
    };

    factory.addCompany = function (company) {
        var deferred = $q.defer();
        $http.post("/api/company/insert", company).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });
        return deferred.promise;
    };

    factory.updateCompany = function (company) {
        var deferred = $q.defer();
        $http.post('/api/company/update', company).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });
        return deferred.promise;
    };

    factory.deleteCompany = function (company) {
        var deferred = $q.defer();
        $http.post('/api/company/delete', { id: company.id }).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });
        return deferred.promise;
    };

    factory.getCinemas = function (company) {
        var deferred = $q.defer();
        $http.post('/api/company/cinemas', company).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });
        return deferred.promise;
    };
    return factory;
});