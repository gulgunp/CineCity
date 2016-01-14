/**
 * Created by gulgu on 22.12.2015.
 */
cinecityApp.controller("CinehallController", function ($scope, CompaniesService){
   $scope.companies =[
       {
            id: 1,
            name: "Mars sinema kulübü",
            cinemas: [
                {
                    id: 1,
                    name: "Cinemaximum Bornova",
                    city: "Izmir",
                    town: "Bornova",
                    cinehalls : [
                        {
                            id:5,
                            name: "Salon 1",
                            seats: [
                                {
                                    seatCode: "A2",
                                    available: 0
                                }
                            ]
                        }
                    ]
                },{
                    id: 1,
                    name: "Cinemaximum Bornova",
                    city: "Izmir",
                    town: "Bornova",
                    cinehalls : [
                        {
                            id:5,
                            name: "Salon 1",
                            seats: [
                                {
                                    seatCode: "A2",
                                    available: 0
                                }
                            ]
                        }
                    ]
                },{
                    id: 1,
                    name: "Cinemaximum Bornova",
                    city: "Izmir",
                    town: "Bornova",
                    cinehalls : [
                        {
                            id:5,
                            name: "Salon 1",
                            seats: [
                                {
                                    seatCode: "A2",
                                    available: 0
                                }
                            ]
                        }
                    ]
                },{
                    id: 1,
                    name: "Cinemaximum Bornova",
                    city: "Izmir",
                    town: "Bornova",
                    cinehalls : [
                        {
                            id:5,
                            name: "Salon 1",
                            seats: [
                                {
                                    seatCode: "A2",
                                    available: 0
                                }
                            ]
                        }
                    ]
                }



            ]
       },

       {
           id: 2,
           name:"Cinemaximum",
           cinemas:[
               {
                   id: 1,
                   name: "Cinemaximum Bandırma",
                   city: "Izmir",
                   town: "Bandırma",
                   cinehalls : [
                       {
                           id:5,
                           name: "Salon 5",
                           seats: [
                               {
                                   seatCode: "A3",
                                   available: 0
                               }
                           ]
                       }
                   ]

               }
           ]
       }

   ];

    $scope.filtered = [];

    CompaniesService.getCompanies().then(function (data) {
        if(data.success) {
            $scope.companies = data.companies;
            index = 0;
            filledArray = [];
            fillCinemas();
        }
    }, function (data) {
        if(data.success == false)
            alert(data.message);
        console.log(data);
    });

    var index = 0;
    var filledArray = [];
    var fillCinemas = function () {
        var company = $scope.companies[index];
        CompaniesService.getCinemas(company).then(function (data) {
            if(data.success == true) {
                company.cinemas = data.cinemas;
                filledArray.push(company);
                index++;
                if($scope.companies.length > index) {
                    fillCinemas();
                    console.log($scope.companies);
                    return;
                } else {
                    $scope.companies = [];
                    for(var i = 0; i < filledArray.length; i++) {
                        $scope.companies.push(filledArray[i]);
                    }
                    return;
                }
            }
        }, function (data) {
            if(data.success == false)
                alert(data.message);
        });
    };

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