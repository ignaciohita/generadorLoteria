/*global angular*/
angular.module('GeneradorLoterias')
    .controller('SeleccionController', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
        'use strict';

        $scope.avanzar = function (tipoSorteo) {
            $rootScope.tipoCombinacion = tipoSorteo;
            $location.path('/cargando');
        };
    }]);