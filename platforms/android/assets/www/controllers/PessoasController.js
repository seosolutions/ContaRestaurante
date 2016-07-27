angular.module('ContaRestaurante')
  .controller('PessoasController', function($scope, $location, Pessoa){
    $scope.pessoas = Pessoa.all();
    console.log($scope.pessoas);
    
    this.getAvatar = function(pessoa){
      var letras = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      
      if(letras.indexOf(pessoa.nome.charAt(0).toLowerCase()) > -1){
        return 'img/alphabet/' + pessoa.nome.charAt(0).toLowerCase() + '.png';
      }else{
        return 'img/alphabet/0.png';
      }
    };
    
    //Action for Pessoas/index
    if($location.path() === '/'){
      this.deleteAll = function(){
        $scope.pessoas = Pessoa.deleteAll();
      };
    }
    
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