/*global angular, progresoCarga*/
angular.module('GeneradorLoterias')
    .controller('CargandoController', ['$scope', '$location', function ($scope, $location) {
        'use strict';

        $scope.cargaInforme = 0;

        $scope.iniciarCargaInforme = function () {
            setTimeout(progresoCarga, 100);
        };

        function progresoCarga() {
            var agregarCarga = Math.floor(Math.random() * 20);

            $scope.cargaInforme = Math.min(100, $scope.cargaInforme + agregarCarga);

            if ($scope.cargaInforme === 100) {
                $location.path('/resultados');
            } else {
                setTimeout(progresoCarga, 250);
            }

            $scope.$apply();
        }
    }]);