function initMap() {

    var map = new google.maps.Map(document.getElementById('map'),
        {
            zoom: 3,
            center: {lat: 32.0700215, lng: 34.8292406}
        });

    var sqrParamsArray = getAreaParams();
    var progressBarMax = sqrParamsArray.length;

    map.addListener("click", function (e) {
        console.log("THIS IS SPARTAAAAAA!!!!11")
        // alert("ALARMA!!!!!!!!!!!!!");

        if (infoWindows) {
            for (var i = 0; i < infoWindows.length; i++) {
                infoWindows[i].close();
            }        }

        if (e.shiftKey) {
            alert('SHIft` with us!')
            if (e.shiftLeft) {
                console.log('shift-left');
            }
            else {
                console.log('shift-right');
            }
        }

    });

    // map.addListener("dblclick", function (event) {
    //     var lat = event.latLng.lat();
    //     var lng = event.latLng.lng();
    //     // populate yor box/field with lat, lng
    //     alert("Lat=" + lat + "; Lng=" + lng);
    //
    // });

    // document.addEventListener("keydown", function(event) {
    //     if (event.keyCode == 32 && event.ctrlKey)
    //         console.log("Continuing!");
    // });
    // map.addEventListener("keydown", function(event) {
    //     // Bind to both command (for Mac) and control (for Win/Linux)
    //     if (event.ctrlKey) {
    //         console.log("CTRL DOWN");
    //     }
    // }, false);


    //-------PROGRESSBAR--------------------
    progressBarControl(progressBarMax);
    $("#progressbar").progressbar({
        value: 0
    });
    //--------------------------------------

    for (var i = 0; i < sqrParamsArray.length; i++) {
        var httpReq = getHttpID(sqrParamsArray[i]);
        setTimeout(sentReq(httpReq), 10000);
    }
    var coordInfoWindow = null;
    var infoWindows = [];

    function sentReq(httpReq) {

        $.getJSON(httpReq, function (data) {
                var cityArrayResponse = data.list;
                // var coordInfoWindow =null;


                if (cityArrayResponse != null) {

                    var coordinates = [];

                    for (var i = 0; i < cityArrayResponse.length; i++) {
                        // for (var i = 0; i < 20; i++) {
//
//                         var location = {
//                             name: cityArrayResponse[i].name,
//                             temp: cityArrayResponse[i].main.temp,
//                             lat: cityArrayResponse[i].coord.Lat,
//                             lng: cityArrayResponse[i].coord.Lon
//                         };
                        var location = new LocationData(cityArrayResponse[i].name, cityArrayResponse[i].coord.Lon, cityArrayResponse[i].coord.Lat, cityArrayResponse[i].main.temp);
                        coordinates.push(location);
                        // console.log("check locationData", location);

                        if (i == (cityArrayResponse.length - 1)) {
                            var prBar = $("#progressbar").progressbar("value");
                            prBar = prBar + 1;
                            $("#progressbar").progressbar("value", prBar);

                        }

                    }
                    //-------------------MARKERS------------------------------------------

                    var markers = coordinates.map(function (location) {
                        // console.log("wtf is here?!", location);
                        var marker = new google.maps.Marker({
                            position: location,
                            animation: google.maps.Animation.DROP,
                        });

                        function closeAllInfoWindows() {
                            for (var i = 0; i < infoWindows.length; i++) {
                                infoWindows[i].close();
                            }
                        }

                        function getNewInfoWindow(location) {
                            coordInfoWindow = new google.maps.InfoWindow();

                            // coordInfoWindow.setContent(createInfoWindowContent(location.temp, location.name));
                            coordInfoWindow.setContent(publishLocationData(location));
                            coordInfoWindow.setPosition(location);
                            coordInfoWindow.open(map);
                            infoWindows.push(coordInfoWindow);
                        }

                        marker.addListener('click', function (e) {
                            console.log('am i in da listener? ');
                            if (coordInfoWindow != null) {
                                console.log('am i in da iffffff? ');

                                console.log('ccccccc', coordInfoWindow);
                                // coordInfoWindow.close();
                                closeAllInfoWindows();

                                getNewInfoWindow();
                            }


                            else {
                                console.log('am i in da elseeee? ');
                                getNewInfoWindow();

                            }
                        });
                        marker.addListener("rightclick", function (event) {
                            getNewInfoWindow();
                        });

                        return marker;

                    });


                    // Add a marker clusterer to manage the markers.
                    var markerCluster = new MarkerClusterer(map, markers,
                        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
                    //--------------------------------------------------------------------
                }
                else {
                    var prBar = $("#progressbar").progressbar("value");
                    prBar = prBar + 1;
                    $("#progressbar").progressbar("value", prBar);
                }

            }
        );
    };
    function closeAllInfoWindows() {
        for (var i = 0; i < infoWindows.length; i++) {
            infoWindows[i].close();
        }
    }

    function getNewInfoWindow(location) {
        coordInfoWindow = new google.maps.InfoWindow();

        // coordInfoWindow.setContent(createInfoWindowContent(location.temp, location.name));
        coordInfoWindow.setContent(publishLocationData(location));
        coordInfoWindow.setPosition(location);
        coordInfoWindow.open(map);
        infoWindows.push(coordInfoWindow);
    }


    function progressBarControl(progressBarMax) {

        $("#progressbar").progressbar({
            classes: {
                "ui-progressbar": "highlight"
            }
        });
        console.log("pBmax = ", progressBarMax);
        $("#progressbar").progressbar(
            {
                max: progressBarMax
            });
    }

    // function createInfoWindowContent(temperature, city) {
    //
    //     return [
    //         'Temp in da ' + city + " is " + temperature
    //
    //     ].join('<br>');
    // }

    function publishLocationData(location) {
        var swtchBtn = document.getElementsByClassName('switch-button');
        // console.log('swtchBtn ', swtchBtn);
        for (var i = 0; i <= swtchBtn.length; i++) {
            console.log('swtchBtn  ', swtchBtn[i]);

            console.log('swtchBtn clsslst ', swtchBtn[i].classList);

            // if (swtchBtn[i].hasClass('switchOn')) {
            if (swtchBtn[i].classList.contains('switchOn')) {

                return [
                    'Temp in da ' + location.getCity() + " is " + location.getTempF() + "F"

                ].join('<br>');
            }
            else {

                return [
                    'Temp in da ' + location.getCity() + " is " + location.getTemp() + "C"

                ].join('<br>');

            }

        }

    }

    function getAreaParams() {
        var areaArray = [];
        var zoom = 10;
        var length = 40;
        var weight = 20;

        for (var i = -90; i < 90; i = i + weight) {
            for (var j = -180; j < 180; j = j + length) {
                var lonLeft = j;
                var latBottom = i + weight;
                var lonRight = j + length;
                var latTop = i;

                var sqrParams = {lngLeft: lonLeft, latBot: latBottom, lngR: lonRight, latTop: latTop, zoom: zoom};

                areaArray.push(sqrParams);
            }
        }

        return areaArray;
    };
    function getHttpID(sqrParams) {

        var httpReq = "http://api.openweathermap.org/data/2.5/box/city?bbox=";
        //http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10
        httpReq = httpReq + sqrParams.lngLeft + "," + sqrParams.latBot + "," + sqrParams.lngR + "," + sqrParams.latTop + ',' + sqrParams.zoom;
        httpReq = httpReq + "&units=metric&appid=833e60aec7b2d7f553c3735403eb9613";

        return httpReq;

    }


}


