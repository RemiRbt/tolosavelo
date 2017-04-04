'use strict';

angular.module('tolosaveloApp')
    .controller('MainCtrl', function ($scope, serviceAjax, $timeout) {
        var watchID = "";
        var userPositionIsSet = false;
        $scope.center = {};
        serviceAjax.all().then(function (data) {
            $scope.stations = data;
            $scope.markers = [];
            var markersGroup = L.markerClusterGroup();

            angular.forEach($scope.stations, function (station) {
                $scope.markers.push({
                    lat: station.position.lat,
                    lng: station.position.lng,
                    layer: 'points',
                    message: "<p class=popup>" +
                        renameStation(station.name) + "<br><br>" +
                        "<i class='fa fa-bicycle' aria-hidden='true'></i> : " + station.available_bikes + "&nbsp &nbsp | &nbsp &nbsp" +
                        // "<i class='fa fa-map-marker' aria-hidden='true'></i> : " + station.available_bike_stands + "<br><br>" +
                        // "<span class='glyphicons glyphicons-parking' aria-hidden='true'></span> : " + station.available_bike_stands + "<br><br>" +
                        "<span class='park'>P</span> : " + station.available_bike_stands + "<br><br>" +
                        // station.address + "<br> <br>
                        "<a href='#/station/" + station.number + "'><i class='fa fa-plus-circle' aria-hidden='true'></i></a></p>",
                    draggable: false
                });
            });
        });

        angular.extend($scope, {
            center: {
                lat: 43.6007,
                lng: 1.4329,
                zoom: 13
            },
            layers: {
                baselayers: {
                    xyz: {
                        name: 'OpenStreetMap (XYZ)',
                        url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
                        type: 'xyz',
                        visible: false
                    }
                },
                overlays: {
                    points: {
                        name: 'Points',
                        type: 'markercluster',
                        visible: true
                    }
                }
            }
        });

        function getPosition() {

            var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            }

            var getID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

            function onSuccess(position) {

                console.log('Latitude: ' + position.coords.latitude + '\n' +
                    'Longitude: ' + position.coords.longitude + '\n' +
                    'Altitude: ' + position.coords.altitude + '\n' +
                    'Accuracy: ' + position.coords.accuracy + '\n' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                    'Heading: ' + position.coords.heading + '\n' +
                    'Speed: ' + position.coords.speed + '\n' +
                    'Timestamp: ' + position.timestamp + '\n');

                $timeout(function () {
                    $scope.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        zoom: 16
                    };
                });
            };

            function onError(error) {
                alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
            }
        }

        function watchPosition() {

            var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000,
                timeout: 30000
            }

            watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

            function onSuccess(position) {

                console.log('Latitude: ' + position.coords.latitude + '\n' +
                    'Longitude: ' + position.coords.longitude + '\n' +
                    'Altitude: ' + position.coords.altitude + '\n' +
                    'Accuracy: ' + position.coords.accuracy + '\n' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                    'Heading: ' + position.coords.heading + '\n' +
                    'Speed: ' + position.coords.speed + '\n' +
                    'Timestamp: ' + position.timestamp + '\n');

                $timeout(function () {
                    if (userPositionIsSet == true) {
                        $scope.markers[$scope.markers.length - 1].lat = position.coords.latitude;
                        $scope.markers[$scope.markers.length - 1].lng = position.coords.longitude;
                    } else {
                        $scope.markers.push({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            layer: 'points',
                            message: "<p class=popup>Vous êtes ici!</p>",
                            draggable: false,
                            icon: {
                                iconUrl: 'img/userLocation.png',
                                iconSize: [30, 30],
                                iconAnchor: [15, 15]
                            }
                        });
                        userPositionIsSet = true;
                    }
                });
            };

            function onError(error) {
                console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
            }

        }
        
        $(document).on('click', '#gps-btn', function () {
            navigator.geolocation.clearWatch(watchID);
            watchPosition();
            getPosition();
        });

    });