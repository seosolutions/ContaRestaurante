angular.module('ContaRestaurante')
  .controller('ConsumosController', function($scope, $location, $routeParams, Consumo){
    $scope.routeParams = $routeParams;
    $scope.consumo = Consumo.new();
    
    $scope.next = function(ev){
     if(ev.keyCode == 13){
       document.getElementById('txt_valor').focus();
     }
    };
    
    this.create = function(){
      Consumo.create($routeParams.pessoaId,$scope.consumo);
      $location.path('/Pessoas/' + $routeParams.pessoaId);
    };
  });