angular.module('ContaRestaurante')
  .controller('PessoasController', function($scope, Pessoa){
    $scope.pessoas = Pessoa.all();
    console.log($scope.pessoas);
    
    this.pessoaKeyPress = function(ev){
      console.log("key press");
    };
  });