angular.module('ContaRestaurante')
  .factory('Pessoa', function PessoaFactory(){
    return {
      new : function(){
        return {
          id : 0,
          nome : '',
          consumos : [],
          pessoasParaDividir : '',
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
        return pessoas;
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
          if(pessoas[pessoaIndex].consumos[i].id == id){
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
      },
      divide : function(pessoa){
        //Ler Tabela de Pessoas
        var pessoas = (sessionStorage.getItem('Pessoas')===null) ? [] : JSON.parse(sessionStorage.getItem('Pessoas'));
        //Encontrar a pessoa com a divisão a ser alterada
        var pessoaIndex;
        for(i=0; i < pessoas.length; i++){
          if(pessoas[i].id == pessoa.id){
            pessoaIndex = i;
            break;
          }
        }
        //Altera e salva na tabela
        pessoas[pessoaIndex] = pessoa;
        sessionStorage.setItem('Pessoas',JSON.stringify(pessoas));
        return true;
      },
      deleteDivide : function(pessoa){
        //Ler Tabela de Pessoas
        var pessoas = (sessionStorage.getItem('Pessoas')===null) ? [] : JSON.parse(sessionStorage.getItem('Pessoas'));
        //Encontrar a pessoa com a divisão a ser alterada
        var pessoaIndex;
        for(i=0; i < pessoas.length; i++){
          if(pessoas[i].id == pessoa.id){
            pessoaIndex = i;
            break;
          }
        }
        //Altera
        pessoas[pessoaIndex].pessoasParaDividir = '';
        //Delete trocos para valores divididos
        var trocos = [];
        for(i=0; i < pessoas[pessoaIndex].trocos.length; i++){
          if( pessoas[pessoaIndex].trocos[i].calcularPara == 'total' ){
            trocos.push(pessoas[pessoaIndex].trocos[i]);
          }
        }
        pessoas[pessoaIndex].trocos = trocos;
        //Salva
        sessionStorage.setItem('Pessoas',JSON.stringify(pessoas));
        return pessoas[pessoaIndex];
      },
      deleteTroco : function(pessoa, id){
        //Ler Tabela de Pessoas
        var pessoas = (sessionStorage.getItem('Pessoas')===null) ? [] : JSON.parse(sessionStorage.getItem('Pessoas'));
        //Encontrar a pessoa com a divisão a ser alterada
        var pessoaIndex;
        for(i=0; i < pessoas.length; i++){
          if(pessoas[i].id == pessoa.id){
            pessoaIndex = i;
            break;
          }
        }
        //Econtra o troco a ser deletado
        var trocoIndex;
        for(i=0; i < pessoas[pessoaIndex].trocos.length; i++){
          if(pessoas[pessoaIndex].trocos[i].id == id){
            trocoIndex = i;
            break;
          }
        }
        //Delete e salva
        pessoas[pessoaIndex].trocos.splice(trocoIndex,1);
        sessionStorage.setItem('Pessoas',JSON.stringify(pessoas));
        return pessoas[pessoaIndex];
      }
    };   
  });