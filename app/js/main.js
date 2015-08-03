/*global angular*/
var angularApp = angular.module('GeneradorLoterias', ['ui.bootstrap', 'ngRoute']);

angularApp.controller('MainController', function ($scope, $location) {
    'use strict';

    $scope.initApp = function () {
        $location.path('/seleccion');
    };
}).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    'use strict';

    $locationProvider.html5Mode();

    $routeProvider.when('/seleccion', {
        templateUrl: 'view/seleccionLoteria.tpl.html',
        controller: 'SeleccionController'
    });

    $routeProvider.when('/cargando', {
        templateUrl: 'view/cargandoResultados.tpl.html',
        controller: 'CargandoController'
    });

    $routeProvider.when('/resultados', {
        templateUrl: 'view/resultadoCombinacion.tpl.html',
        controller: 'ResultadoController'
    });
}]);
