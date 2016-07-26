angular.module('ContaRestaurante')
  .controller('PessoasController', function($scope, $location, Pessoa){
    $scope.pessoas = Pessoa.all();
    console.log($scope.pessoas);
    
    this.pessoaKeyPress = function(ev){
      if(ev.keyCode == 13){
        //do some saving here...
        //Pessoa.create(pessoa)
        $location.path('/');
      }
    };
  });