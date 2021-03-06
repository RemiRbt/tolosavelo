'use strict';

// Controleur de la page station

angular.module('tolosaveloApp')

    //Affichage de la map des points d'intérets centrée sur la postion de la station choisie
    .controller('StationCtrl', function ($scope, $routeParams, serviceAjax) {
        var id = $routeParams.id;
        $scope.markers = [];
        $scope.center = {};
        serviceAjax.station(id).then(function (data) {
            $scope.station = data;
            $scope.station.name = renameStation($scope.station.name);
            $scope.station.last_update = data.last_update;

            $scope.markers.push({
                lat: $scope.station.position.lat,
                lng: $scope.station.position.lng,
                layer: 'points',
                draggable: false
            });

            $scope.center = {
                lat: $scope.station.position.lat,
                lng: $scope.station.position.lng,
                zoom: 17
            };
        });

        // Options de la map des points d'intérets + lien vers l'API
        angular.extend($scope, {
            layers: {
                baselayers: {
                    xyz: {
                        name: 'OpenStreetMap (XYZ)',
                        url: 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=4cf96d3c03d845009eb0cc90630c7389',
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
    });