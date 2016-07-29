angular.module('ContaRestaurante')
  .factory('Troco', function TrocoFactory(){
    return {
      new : function(){
        return {
          id : 0,
          calcularPara : '',
          valorPago : ''
        };
      },
      create : function(pessoaId,troco){
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
        
         //Atribui um ID ao troco
        troco.id = parseInt(Date.now());
        
        //Adicionar o consumo para a pessoa alterada
        pessoas[pessoaIndex].trocos.push(troco);
        //Salva
        sessionStorage.setItem('Pessoas',JSON.stringify(pessoas));
        return true;
      }
    };
  });