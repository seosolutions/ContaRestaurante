angular.module('ContaRestaurante')
  .factory('Pessoa', function PessoaFactory(){
    return {
      all : function(){
        return [];
      },
      create : function(){
        return true;
      }
    };   
  });