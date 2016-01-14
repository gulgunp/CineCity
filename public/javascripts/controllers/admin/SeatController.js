/**
 * Created by talha on 23.12.2015.
 */
adminapp.controller('SeatController', function ($scope, $rootScope, SeatService) {
    $scope.seats = [];
    $rootScope.currentPage = 2;
    var refresh = function () {
        SeatService.getSeatsByCinehall($scope.cineHall).then(function (data) {
            if(data.success === true)
                $scope.seats = data.seats;
        }, function (data) {
            if(data.success === false)
                alert(data.message);
        })
    };

    setTimeout(function () {
        refresh();
    }, 300);

    $scope.update = function ($index) {
        var seat = {
            seatCode: $scope.seats[$index].seatCode,
            cineHall: $scope.cineHall.id
        };
        SeatService.deleteSeat($scope.seats[$index]).then(function (data) {
            SeatService.addSeat(seat).then(function (data) {
                if(data.success == true)
                    alert("Seat was successfully updated.");
                else
                    alert(data.message);
            }, function (data) {
                if(data.success === false)
                    alert(data.message);
            });
        }, function (data) {
            if (data.success === false)
                alert(data.message);
        });
    };

    $scope.addSeat = function () {
        $scope.newSeat.cineHall = $scope.cineHall.id;
        SeatService.addSeat($scope.newSeat).then(function (data) {
            if(data.success === true)
                alert(data.message);
            refresh();
        }, function (data) {
            if(data.success === false)
                alert(data.message);
        });
    };

    $scope.delete = function ($index) {
        SeatService.deleteSeat($scope.seats[$index]).then(function (data) {
            if(data.success === true) {
                refresh();
            }
            alert(data.message);
        }, function (data) {
            if (data.success === false)
                alert(data.message);
        });
    };

});