/**
 * Created by talha on 24.12.2015.
 */
var firstSeatLabel = 1;

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

$(document).ready(function () {
    var $cart = $('#selected-seats'),
        $counter = $('#counter'),
        $total = $('#total');
    var sc;
    //this will handle "[cancel]" link clicks
    $('#selected-seats').on('click', '.cancel-cart-item', function () {
        //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
        sc.get($(this).parents('li:first').data('seatId')).click();
    });
    setTimeout(function () {
        if(!localStorage.getItem("user")) {
            window.location.href = "/register";
        }
    }, 1000);


    var buyInProgress = false;
    //let's pretend some seats have already been booked
    var cineHall = $.urlParam("cinehall");
    var seance = $.urlParam("seance");
    $.post("/api/seance/seats", {cinehallId: cineHall, seanceId: seance}, function (data, status) {
        var maxColSize = 7;
        var mMap = [];
        var totalIndex = 0;
        var seatsArr = data.seats;
        for (var i = 0; i < Math.ceil(data.seats.length / maxColSize); i++) {
            var row = "";
            if (mMap.length != 3) {
                row += "_";
            } else {
                row += "__";
            }
            var temp = maxColSize;
            if(mMap.length == 3) {
                temp = maxColSize -2;
            }
            for (var j = 0; j < temp; j++) {

                if (data.seats.length > totalIndex) {
                    row += "s";
                    totalIndex++;
                } else {
                    break;
                }

            }

            if (row != "_" || row != "__") {
                if (mMap.length != 3) {
                    row += "_";
                } else {
                    row += "__";
                }
                mMap.push(row);
            }
        }
        sc = $('#seat-map').seatCharts({
            map: mMap,
            seats: {
                s: {
                    price: 15,
                    classes: 'first-class', //your custom CSS class
                    category: 'Sinema Bileti'
                }
            },
            naming: {
                top: false,
                getLabel: function (character, row, column) {
                    return firstSeatLabel++;
                },
                getId: function(character, row, column) {
                    var label = firstSeatLabel;
                    return seatsArr[label - 1].seatCode;
                },
            },
            legend: {
                node: $('#legend'),
                items: [
                    ['s', 'available', 'Boş koltuk'],
                    ['s', 'unavailable', 'Dolu koltuk']
                ]
            },
            click: function () {
                if (this.status() == 'available') {
                    //let's create a new <li> which we'll add to the cart items
                    $('<li>' + this.data().category + ' # ' + this.settings.id + ': <b>₺' + this.data().price + '</b> <a href="#" class="cancel-cart-item">[iptal]</a></li>')
                        .attr('id', 'cart-item-' + this.settings.id)
                        .data('seatId', this.settings.id)
                        .appendTo($cart);
                    $counter.text(sc.find('selected').length + 1);
                    $total.text(recalculateTotal(sc) + this.data().price);

                    return 'selected';
                } else if (this.status() == 'selected') {
                    //update the counter
                    $counter.text(sc.find('selected').length - 1);
                    //and total
                    $total.text(recalculateTotal(sc) - this.data().price);

                    //remove the item from our cart
                    $('#cart-item-' + this.settings.id).remove();

                    //seat has been vacated
                    return 'available';
                } else if (this.status() == 'unavailable') {
                    //seat has been already booked
                    return 'unavailable';
                } else {
                    return this.style();
                }
            }
        });

        $.each(data.seats, function (index, seats) {
            if(seats.state == 1)
                sc.status(seats.seatCode, 'unavailable');
        });

    }, "json");
    $("#buy").on('click', function () {
        var cash = recalculateTotal(sc);
        if (cash != 0) {
            var user = JSON.parse(window.localStorage.getItem("user"));
            sc.find('selected').each(function () {
                var postData = {
                    member: user.id,
                    seance: $.urlParam("seance"),
                    cinehall: $.urlParam("cinehall"),
                    price: this.data().price,
                    seat: this.settings.id
                };
                console.log("selected", postData);
                $.post("/api/ticket/insert", postData, function (data, status) {
                    if(data.success) {
                        $("#modal").fadeIn(function () {
                            setTimeout(function() {
                                window.location.href = "/";
                            }, 2500);
                        });
                    }
                },"json");
            });
        }
    });
    setInterval(function () {
        $.post("/api/seance/seats", { cinehallId: 2, seanceId: 2 }, function (data, status) {
            $.each(data.seats, function(index, seats) {
                //find seat by id and set its status to unavailable
                if(seats.state == 1)
                    sc.status(seats.seatCode, 'unavailable');
            });
        },"json");
    }, 10000);


});

function recalculateTotal(sc) {
    var total = 0;

    sc.find('selected').each(function () {
        total += this.data().price;
    });

    return total;
}
