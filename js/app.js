'use strict';

//Gère la redirection en associant un contrôleur à chaque vue
angular
    .module('tolosaveloApp', ['ngRoute', 'ngResource', 'leaflet-directive'])
    .config(function ($routeProvider, $locationProvider, $logProvider) {
        //clean console from all mouseover, ...
        $logProvider.debugEnabled(false);
        $routeProvider
            .when('/', {
                templateUrl: 'js/views/main.html',
                controller: 'MainCtrl'
            })
            .when('/info', {
                templateUrl: 'js/views/info.html',
                controller: 'InfoCtrl'
            })
            .when('/station/:id', {
                templateUrl: 'js/views/station.html',
                controller: 'StationCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.hashPrefix('');
    });