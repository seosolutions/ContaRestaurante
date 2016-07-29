angular.module('ContaRestaurante')
  .controller('TrocosController', function($scope, $location, $routeParams, Pessoa, Troco){
    $scope.routeParams = $routeParams;
    $scope.pessoa = Pessoa.find($routeParams.pessoaId);
    $scope.troco = Troco.new();
    
    this.create = function(){
      Troco.create($scope.pessoa.id, $scope.troco);
      $location.path('/Pessoas/' + $routeParams.pessoaId);
    };
  });