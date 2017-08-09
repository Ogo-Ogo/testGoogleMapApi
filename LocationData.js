/**
 * Created by OU on 30/07/2017.
 */

    function LocationData (city, lng, lat, temp) {
        this.city = city;
        this.lng = lng;
        this.lat = lat;
        this.temp = temp;

        this.getCity = function () {
            return city;
        }

        this.getTemp = function () {
            return Math.round(temp);
        }
        this.getTempF = function () {
            return Math.round((temp  * 1.8) + 32);
        }
    }

// function getCity() {
//         return this.city;
//     }

function getLng() {
        return this.lng;
    }

function getLat() {
        return this.lat;
    }

// function getTemp () {
//         return this.temp;
//     }

function setCity(city) {
         this.city=city;
    }

function setLon(lng) {
         this.lng=lng;
    }

function setLat(lat) {
         this.lat=lat;
    }

function setTemp (temp) {
         this.temp=temp;
    }

// class LocationData {
//     constructor() {
//
//     }
//
//     constructor(city, lon, lat, temp) {
//         this.city = city;
//         this.lon = lon;
//         this.lat = lat;
//         this.temp = temp;
//     }
//
//     get city() {
//         return this.city;
//     }
//
//     get lon() {
//         return this.lon;
//     }
//
//     get lat() {
//         return this.lat;
//     }
//
//     get temp () {
//         return this.temp;
//     }
//
//     set city(city) {
//          this.city=city;
//     }
//
//     set lon(lon) {
//          this.lon=lon;
//     }
//
//     set lat(lat) {
//          this.lat=lat;
//     }
//
//     set temp (temp) {
//          this.temp=temp;
//     }



    // set coord(location) {
    //      [this.lon=location.lat]
    //          [this.firstName, this.lastName] = newValue.split(' ');
    //
    // }


