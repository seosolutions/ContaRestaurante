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
      this.valorTotalPessoa = function(pessoa){
        var valorTotal = 0;
        for(i=0; i < pessoa.consumos.length; i++){
          valorTotal += pessoa.consumos[i].valorTotal;
        }
        return valorTotal;
      };
      
      this.valorTotal = 0;
      
      this.atualizaValorTotal = function(){
        this.valorTotal = 0;
        for(var i = 0; i < $scope.pessoas.length; i++){
          this.valorTotal += this.valorTotalPessoa($scope.pessoas[i]);
        }
      };
      
      this.atualizaValorTotal();
      
      this.delete = function(id){
        $scope.pessoas = Pessoa.delete(id);
        this.atualizaValorTotal();  
      };
      
      this.deleteAll = function(){
        $scope.pessoas = Pessoa.deleteAll();
        this.valorTotal = 0;
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
      
      this.atualizaValorTotal = function(){
        this.valorTotal = 0;
        for(i=0; i < $scope.pessoa.consumos.length ; i++){
          this.valorTotal += $scope.pessoa.consumos[i].valorTotal;
        }
      };
      
      this.atualizaValorTotal();
      
      this.delete = function(){
        Pessoa.delete($scope.pessoa.id);
        $location.path('/');
      };
      
      this.deleteConsumo = function(id){
        $scope.pessoa = Pessoa.deleteConsumo($scope.pessoa.id, id);
        this.atualizaValorTotal();
      };
      
      this.deleteConsumoAll = function(){
        $scope.pessoa = Pessoa.deleteConsumoAll($scope.pessoa.id);
        this.valorTotal = 0;
      };
      
      this.deleteDivide = function(){
        $scope.pessoa = Pessoa.deleteDivide($scope.pessoa);
      };
      
      this.deleteTroco = function(id){
        $scope.pessoa = Pessoa.deleteTroco($scope.pessoa, id);
      };
      
      this.shareWhatsapp = function(){
        var msg = '';
        
        msg += '*' + $scope.pessoa.nome + ':* R$ ' + ( ($scope.exibirGorjeta) ?  ( this.valorTotal * 1.1 ).toFixed(2) : this.valorTotal.toFixed(2) ) + '\n';
        msg += '(Valor ' + (  ($scope.exibirGorjeta) ? 'com' : 'sem' ) + ' gorjeta)' + '\n\n';
        
        if($scope.pessoa.pessoasParaDividir !== '' && $scope.pessoa.pessoasParaDividir > 1){
          msg += '*Valor dividido por ' + $scope.pessoa.pessoasParaDividir + ':* R$ ' + ( ($scope.exibirGorjeta) ?  ( this.valorTotal * 1.1 / $scope.pessoa.pessoasParaDividir ).toFixed(2) : (this.valorTotal / $scope.pessoa.pessoasParaDividir).toFixed(2) ) + '\n\n';
        }
        
        for(i=0; i < $scope.pessoa.trocos.length; i++){
          msg += '*Valor Pago:* R$ ' + $scope.pessoa.trocos[i].valorPago.toFixed(2) + '\n';
          msg += '*Troco para o valor ' + $scope.pessoa.trocos[i].calcularPara  + ':* R$ ';
          msg += ( ($scope.pessoa.trocos[i].calcularPara === 'dividido') ?
                    ( ($scope.exibirGorjeta) ?  ( $scope.pessoa.trocos[i].valorPago - (this.valorTotal * 1.1 / $scope.pessoa.pessoasParaDividir) ).toFixed(2) : ($scope.pessoa.trocos[i].valorPago - (this.valorTotal / $scope.pessoa.pessoasParaDividir) ).toFixed(2) ) :
                    ( ($scope.exibirGorjeta) ?  ( $scope.pessoa.trocos[i].valorPago - (this.valorTotal * 1.1) ).toFixed(2) : ($scope.pessoa.trocos[i].valorPago - this.valorTotal ).toFixed(2) ) 
                  );
          msg += '\n\n';
        }
        
        msg += '_Calculado via Conta Restaurante_';
        
        var text = encodeURIComponent(msg);
        openDeviceBrowser('whatsapp://send?text=' + text);
      };
      
    }// Pessoas/:id
    
    //Actions for Pessoas/:pessoaId
    if($routeParams.pessoaId !== undefined){
      $scope.pessoa = Pessoa.find($routeParams.pessoaId);
      
      this.divide = function(ev){
        if(ev.keyCode == 13){
          Pessoa.divide($scope.pessoa);
          $location.path('/Pessoas/' + $scope.pessoa.id);
        }
      };
      
      this.divideTabPress = function(){
        Pessoa.divide($scope.pessoa);
        $location.path('/Pessoas/' + $scope.pessoa.id);
      };
    }// Pessoas/:pessoaId
    
  });