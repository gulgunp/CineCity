/**
 * Created by talha on 26.11.2015.
 */
adminapp.factory('MovieService', function($q, $http){
    var factory = {};

    factory.getMovies = function() {
        var deferred = $q.defer();
        $http.get('/api/movies').then(function(data) {
            deferred.resolve(data.data);
        }, function(data) {
            deferred.reject(data.data);
        });
        return deferred.promise;
    };

    factory.deleteMovie = function (id) {
        var deferred = $q.defer();

        $http.post('/api/movie/delete',{ id: id }).then(function (data) {
            deferred.resolve(data.data);
        }, function (data) {
            deferred.reject(data.data);
        });
        return deferred.promise;
    };

    factory.insertMovie = function(movie){
        var deferred = $q.defer();

        $http.post('/api/movie/insert',{
            name: movie.name,
            duration: movie.duration,
            imdb : movie.imdb,
            description: movie.description,
            img: movie.img,
            teaser: movie.teaser,
            now_showing: movie.now_showing
        }).then(function(data){
            deferred.resolve(data.data);
        },function(data){
            deferred.reject(data.data);
        });
        return deferred.promise;
    };


    factory.updateMovie = function(movie){
        var deferred = $q.defer();

        $http.post('/api/movie/update',{
            id: movie.id,
            name: movie.name,
            duration: movie.duration,
            imdb : movie.imdb,
            description: movie.description,
            img: movie.img,
            teaser: movie.teaser,
            now_showing: movie.now_showing,
            view_count: movie.view_count
        }).then(function(data){
            deferred.resolve(data.data);
        },function(data){
            deferred.reject(data.data);
        });
        return deferred.promise;
    };
    return factory;
});