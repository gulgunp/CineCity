/**
 * Created by gulgu on 19.12.2015.
 */
cinecityApp.controller("StoreController", function ($scope) {
    $scope.products =[
        {
        id: 1,
        name: "Pofuduk Ayıcık",
        img:"http://www.onikibilgi.com/wp-content/uploads/hediyelik-ayicik.jpg" ,
        price: 5
        },
        {
            id: 2,
            name: "Pofuduk Ayıcık",
            img:"http://www.onikibilgi.com/wp-content/uploads/hediyelik-ayicik.jpg",
            price: 5
        },
        {
            id: 3,
            name: "Pofuduk Ayıcık",
            img:"http://www.onikibilgi.com/wp-content/uploads/hediyelik-ayicik.jpg",
            price: 5
        },

        {
            id: 4,
            name: "Pofuduk Ayıcık",
            img:"http://www.onikibilgi.com/wp-content/uploads/hediyelik-ayicik.jpg",
            price: 5
        },

        {
            id: 5,
            name: "Pofuduk Ayıcık",
            img:"http://www.onikibilgi.com/wp-content/uploads/hediyelik-ayicik.jpg",
            price: 5
        }
    ];


    $scope.filtered = [];

    var getCinemasForCity = function (city) {
        var result = [];
        for(var i = 0; i < $scope.cineHall.length; i++) {
            var company = $scope.cineHall[i];
            for(var j = 0; j < company.cinemas.length; j++) {
                var cinema = company.cinemas[j];
                if(cinema.city == city) {
                    result.push(cinema);
                }
            }
        }
        filtered = result;
    };
});