'use strict';

//Api JCDecaux

angular
    .module('tolosaveloApp')
    .factory('serviceAjax', function serviceAjax($http) {
        return {
            all: function () {
                return $http.get('https://api.jcdecaux.com/vls/v1/stations/?contract=Toulouse&apiKey=a1691a46e8dd0ed2705c205d34bca5a4a3ccab7c').then(function (result) {
                    //resolve the promise as the data
                    return result.data;
                });
            },
            station: function (id) {
                return $http.get('https://api.jcdecaux.com/vls/v1/stations/'+ id +'?contract=Toulouse&apiKey=a1691a46e8dd0ed2705c205d34bca5a4a3ccab7c').then(function (result) {
                    //resolve the promise as the data
                    return result.data;
                });
            }
        };
    });