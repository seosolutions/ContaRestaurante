angular.module('ContaRestaurante')
  .controller('ConsumosController', function($scope, $location, $routeParams, Consumo){
    $scope.routeParams = $routeParams;
    $scope.consumo = Consumo.new();
    
    this.create = function(){
      Consumo.create($routeParams.pessoaId,$scope.consumo);
      $location.path('/Pessoas/' + $routeParams.pessoaId);
    };
  });