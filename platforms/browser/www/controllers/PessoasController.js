angular.module('ContaRestaurante')
  .controller('PessoasController', function($scope, $location, Pessoa){
    $scope.pessoas = Pessoa.all();
    console.log($scope.pessoas);
    
    //Action for Pessoas/new
    if($location.path() === '/Pessoas/new'){
      //set new person
      $scope.pessoa = Pessoa.new();
      //set person's id
      $scope.pessoa.id = $scope.pessoas.length;
      
      //Track for a enter key hit to save
      this.pessoaKeyPress = function(ev){
        if(ev.keyCode == 13){
          Pessoa.create($scope.pessoa);
          $location.path('/');
        }
      };  
    }// /Pessoas/new
    
    
  });