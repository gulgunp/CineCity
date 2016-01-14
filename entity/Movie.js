/**
 * Created by talha on 25.11.2015.
 */
var Movie = function(obj/*id, name, duration, imdb, description, img, teaser, now_showing, view_count*/) {
    this.id = obj.id || -1;
    this.name = obj.name;
    this.duration = obj.duration;
    this.imdb = obj.imdb;
    this.description = obj.description;
    this.img = obj.img;
    this.teaser = obj.teaser;
    this.now_showing = obj.now_showing || 0;
    this.view_count = obj.view_count || 0;

    var SEANCES = null;

    this.getSeances = function (callback) {
        /**
         * Fetch from db
         */
    }

};


module.exports = Movie;