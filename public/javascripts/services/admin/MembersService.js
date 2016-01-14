/**
 * Created by talha on 8.12.2015.
 */
adminapp.factory('MembersService', function ($q, $http) {
    var factory = {};

    factory.getMembers = function () {
        var deferred = $q.defer();
        $http.get('/api/members').then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });
        return deferred.promise;
    };

    factory.updateMember = function (member) {
        var deferred = $q.defer();
        $http.post("/api/member/update", member).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    factory.deleteMember = function (member) {
        var deferred = $q.defer();

        $http.post("/api/member/delete", { id: member.id }).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });

        return deferred.promise;
    };

    return factory;
});