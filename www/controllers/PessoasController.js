angular.module('ContaRestaurante')
  .controller('PessoasController', function($scope, $location, $routeParams, Pessoa){
    $scope.pessoas = Pessoa.all();
    
    this.getAvatar = function(obj){
      var letras = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      
      if(letras.indexOf(obj.nome.charAt(0).toLowerCase()) > -1){
        return 'img/alphabet/' + obj.nome.charAt(0).toLowerCase() + '.png';
      }else{
        return 'img/alphabet/0.png';
      }
    };
    
    //Action for Pessoas/index
    if($location.path() === '/'){
      this.deleteAll = function(){
        $scope.pessoas = Pessoa.deleteAll();
      };
    }// /Pessoas/index
    
    //Action for Pessoas/new
    if($location.path() === '/Pessoas/new'){
      //set new person
      $scope.pessoa = Pessoa.new();
      //set person's id
      $scope.pessoa.id = parseInt(Date.now());
      
      //Track for a enter key hit to save
      this.pessoaKeyPress = function(ev){
        if(ev.keyCode == 13){
          Pessoa.create($scope.pessoa);
          $location.path('/');
        }
      };  
    }// /Pessoas/new
    
    //Action for Pessoas/:id
    if($routeParams.id !== undefined){
      $scope.pessoa = Pessoa.find($routeParams.id);
      
      this.delete = function(){
        Pessoa.delete($scope.pessoa.id);
        $location.path('/');
      };
      
      this.deleteConsumo = function(id){
        $scope.pessoa = Pessoa.deleteConsumo($scope.pessoa.id, id);
      };
      
      this.deleteConsumoAll = function(){
        $scope.pessoa = Pessoa.deleteConsumoAll($scope.pessoa.id);
      };
    }// Pessoas/:id
    
  });