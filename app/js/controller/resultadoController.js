/*global angular*/
angular.module('GeneradorLoterias')
    .controller('ResultadoController', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
        'use strict';

        $scope.obtenerResultado = function () {
            var i,
                numeroAleatorio;

            $scope.resultados = [];

            if ($rootScope.tipoCombinacion === 'quiniela') {
                for (i = 1; i <= 15; i += 1) {
                    numeroAleatorio = Math.floor(Math.random() * 3);

                    if (numeroAleatorio === 0) {
                        $scope.resultados.push({
                            posicion: i,
                            valor: 'X'
                        });
                    } else {
                        $scope.resultados.push({
                            posicion: i,
                            valor: numeroAleatorio.toString()
                        });
                    }
                }
            } else {
                while ($scope.resultados.length < 6) {
                    numeroAleatorio = Math.ceil(Math.random() * 49);

                    if ($scope.resultados.indexOf(numeroAleatorio) === -1) {
                        $scope.resultados.push(numeroAleatorio);
                    }
                }

                $scope.resultados.sort(function (a, b) {
                    return a > b;
                });

                for (i = 0; i < $scope.resultados.length; i += 1) {
                    $scope.resultados[i] = {
                        posicion: i + 1,
                        valor: $scope.resultados[i]
                    };
                }
            }
        };
    }]);