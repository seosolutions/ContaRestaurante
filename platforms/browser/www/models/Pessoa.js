angular.module('ContaRestaurante')
  .factory('Pessoa', function PessoaFactory(){
    return {
      all : function(){
        return (sessionStorage.getItem('Pessoas')===null) ? [] : JSON.parse(sessionStorage.getItem('Pessoas'));
      },
      new : function(){
        return {
          id : 0,
          nome : '',
          consumos : [],
          valorTotal : 0,
          pessoasParaDividir : 0,
          trocos : []
        };
      },
      create : function(pessoa){
        var pessoas = (sessionStorage.getItem('Pessoas')===null) ? [] : JSON.parse(sessionStorage.getItem('Pessoas'));
        pessoas.push(pessoa);
        sessionStorage.setItem('Pessoas',JSON.stringify(pessoas));
        return true;
      }
    };   
  });