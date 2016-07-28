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
      deleteConsumo : function(pessoaId, id){
        //Ler Tabela de Pessoas
        var pessoas = (sessionStorage.getItem('Pessoas')===null) ? [] : JSON.parse(sessionStorage.getItem('Pessoas'));
        //Encontrar a pessoa com o consumo a ser deletado
        var pessoaIndex;
        for(i=0; i < pessoas.length; i++){
          if(pessoas[i].id == pessoaId){
            pessoaIndex = i;
            break;
          }
        }
        //Encontrar o consumo a ser deletado
        var consumoIndex;
        for(i=0; i < pessoas[pessoaIndex].consumos.length; i++){
          if(pessoas[pessoaIndex].consumos[i] == id){
            consumoIndex = i;
            break;
          }
        }
        //Deletar o consumo
        pessoas[pessoaIndex].consumos.splice(consumoIndex,1);
        //salva
        sessionStorage.setItem('Pessoas',JSON.stringify(pessoas));
        return pessoas[pessoaIndex];
      },
      deleteConsumoAll : function(id){
        //Ler Tabela de Pessoas
        var pessoas = (sessionStorage.getItem('Pessoas')===null) ? [] : JSON.parse(sessionStorage.getItem('Pessoas'));
        //Encontrar a pessoa com o consumo a ser deletado
        var pessoaIndex;
        for(i=0; i < pessoas.length; i++){
          if(pessoas[i].id == id){
            pessoaIndex = i;
            break;
          }
        }
        //Deletar todos os consumos
        pessoas[pessoaIndex].consumos = [];
        //salva
        sessionStorage.setItem('Pessoas',JSON.stringify(pessoas));
        return pessoas[pessoaIndex];
      },
      deleteAll : function(){
        var pessoas = [];
        sessionStorage.setItem('Pessoas',JSON.stringify(pessoas));
        return pessoas;
      }
    };   
  });