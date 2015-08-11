/*global angular*/
angular.module('GeneradorLoterias')
    .controller('ResultadoController', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
        'use strict';

        $scope.obtenerResultado = function () {
            var i,
                numeroAleatorio,
                patronVibracion = [],
                aceleracionAnterior;

            $scope.resultados = [];

            if ($rootScope.tipoCombinacion === 'quiniela') {
                for (i = 1; i <= 15; i += 1) {
                    numeroAleatorio = Math.floor(Math.random() * 3);

                    if (numeroAleatorio === 0) {
                        $scope.resultados.push({
                            posicion: i,
                            valor: 'X'
                        });

                        patronVibracion.push(300);
                    } else {
                        $scope.resultados.push({
                            posicion: i,
                            valor: numeroAleatorio.toString()
                        });

                        patronVibracion.push(numeroAleatorio * 200);
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

                    patronVibracion.push($scope.resultados[i].valor * 100);
                }
            }

            if (navigator && navigator.vibrate) {
                navigator.vibrate(patronVibracion);
            }

            if (navigator && navigator.accelerometer !== undefined) {
                $scope.acelerometroDisponible = true;

                navigator.accelerometer.watchAcceleration(function (acceleration) {
                    var aceleracionActual;

                    if (aceleracionAnterior !== undefined) {
                        aceleracionActual = {};
                        aceleracionActual.x = Math.abs(aceleracionAnterior.x - acceleration.x);
                        aceleracionActual.y = Math.abs(aceleracionAnterior.y - acceleration.y);
                        aceleracionActual.z = Math.abs(aceleracionAnterior.z - acceleration.z);
                        aceleracionActual.total = aceleracionActual.x + aceleracionActual.y + aceleracionActual.z;
                        $scope.$apply();
                    }

                    if (aceleracionActual && aceleracionActual.total > 50) {
                        $location.path('/cargando');
                    }

                    aceleracionAnterior = acceleration;
                }, undefined, {
                    frequency: 300
                });
            } else {
                $scope.acelerometroDisponible = false;
            }
        };
    }]);
