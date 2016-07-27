angular.module('ContaRestaurante')
  .factory('Pessoa', function PessoaFactory(){
    return {
      new : function(){
        return {
          id : 0,
          nome : '',
          consumos : [],
          pessoasParaDividir : 0,
          trocos : []
        };
      },
      all : function(){
        return (sessionStorage.getItem('Pessoas')===null) ? [] : JSON.parse(sessionStorage.getItem('Pessoas'));
      },
      create : function(pessoa){
        var pessoas = (sessionStorage.getItem('Pessoas')===null) ? [] : JSON.parse(sessionStorage.getItem('Pessoas'));
        pessoas.push(pessoa);
        sessionStorage.setItem('Pessoas',JSON.stringify(pessoas));
        return true;
      },
      find : function(id){
        var pessoas = (sessionStorage.getItem('Pessoas')===null) ? [] : JSON.parse(sessionStorage.getItem('Pessoas'));
        var pessoa;
        for(i=0; i < pessoas.length; i++){
          if(pessoas[i].id == id){
            pessoa = pessoas[i];
            break;
          }
        }
        return pessoa;
      },
      delete : function(id){
        var pessoas = (sessionStorage.getItem('Pessoas')===null) ? [] : JSON.parse(sessionStorage.getItem('Pessoas'));
        var index;
        for(i=0; i < pessoas.length; i++){
          if(pessoas[i].id == id){
            index = i;
            break;
          }
        }
        pessoas.splice(index,1);
        sessionStorage.setItem('Pessoas',JSON.stringify(pessoas));
        return true;
      },
      deleteAll : function(){
        var pessoas = [];
        sessionStorage.setItem('Pessoas',JSON.stringify(pessoas));
        return pessoas;
      }
    };   
  });