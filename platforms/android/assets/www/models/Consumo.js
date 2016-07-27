angular.module('ContaRestaurante')
  .factory('Consumo', function ConsumoFactory(){
    return {
      new : function(){
        return {
          id : 0,
          nome  : '',
          valor : '',
          qtde : '',
          valorTotal : 0
        };
      },
      all : function(perssoaId){
        //Ler Tabela de Pessoas
        var pessoas = (sessionStorage.getItem('Pessoas')===null) ? [] : JSON.parse(sessionStorage.getItem('Pessoas'));
        //Ler o índice da pessoa com os consumos
        var pessoaIndex;
        for(i=0; i < pessoas.length; i++){
          if(pessoas[i].id == pessoaId){
            pessoaIndex = i;
            break;
          }
        }
        //retorna os consumos da pessoa
        return pessoas[pessoaIndex].consumos;
      },
      create : function(pessoaId, consumo){
        //Atribui um ID ao consumo
        consumo.id = parseInt(Date.now());
        //Calcular o valor total do consumo
        consumo.valorTotal = consumo.valor * consumo.qtde;
        //Ler Tabela de Pessoas
        var pessoas = (sessionStorage.getItem('Pessoas')===null) ? [] : JSON.parse(sessionStorage.getItem('Pessoas'));
        //Ler o índice da pessoa a ser alterada
        var pessoaIndex;
        for(i=0; i < pessoas.length; i++){
          if(pessoas[i].id == pessoaId){
            pessoaIndex = i;
            break;
          }
        }
        //Adicionar o consumo para a pessoa alterada
        pessoas[pessoaIndex].consumos.push(consumo);
        //Salva
        sessionStorage.setItem('Pessoas',JSON.stringify(pessoas));
        return true;
      }
    };
  });