//Launch this as an app: 
// "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --app=http://localhost/ContaRestaurante/www/
(function(){
  var myApp = angular.module('ContaRestaurante', ['ngMaterial', 'ngRoute']);
  
  myApp.config(function($mdThemingProvider,$routeProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('grey');
    
    //Routes
    $routeProvider
    .when('/', {
      templateUrl : 'views/igualmente.html',
      controller : 'igualmenteCtrl'
    })
    .when('/individualmente', {
      templateUrl : 'views/individualmente.html',
      controller : 'individualmenteCtrl' 
    })
    .when('/gastos-comuns', {
      templateUrl : 'views/comuns.html',
      controller : 'comunsCtrl'
    })
    .when('/inserir-grupos', {
      templateUrl : 'views/inserir-grupos.html',
      controller : 'igCtrl'
    })
    .when('/inserir-gastos', {
      templateUrl : 'views/inserir-gastos.html',
      controller : 'inserirGastosCtrl'
    })
    .when('/editar-grupo', {
      templateUrl : 'views/editar-grupo.html',
      controller : 'editarGrupoCtrl'
    })
    .otherwise ({ redirectTo: '/' });
    
  });
  
  myApp.controller('igualmenteCtrl', function($scope,$mdSidenav){
    document.addEventListener("deviceready", function(){
      window.analytics.trackView('Dividir Igualmente');  
    }, false);
    window.scrollTo(0,0);
    $mdSidenav('left').close();
    
    $scope.conta = {
      valorTotal : '',
      gorjeta : "s",
      totalPessoas : ''
    };
    
    $scope.limpar = function(){
      $scope.conta = {
        valorTotal : '',
        gorjeta : "s",
        totalPessoas : ''
      };
    };
  });
  
  myApp.controller('individualmenteCtrl', function($scope,$mdSidenav){
    document.addEventListener("deviceready", function(){
      window.analytics.trackView('Dividir Individualmente');  
    }, false);
    window.scrollTo(0,0);
    $mdSidenav('left').close();
    
    $scope.gastosComuns = (sessionStorage.getItem('gastosComuns')===null) ? [] : JSON.parse(sessionStorage.getItem('gastosComuns'));
        
    $scope.totalGastosComuns = 0;
    for(var i = 0; i < $scope.gastosComuns.length; i++){
      $scope.totalGastosComuns += ($scope.gastosComuns[i].valor * $scope.gastosComuns[i].qtde);
    }
    
    $scope.grupos = (sessionStorage.getItem('grupos')===null) ? [] : JSON.parse(sessionStorage.getItem('grupos')); 
    
    $scope.valorTotalGrupos = 0;
    for(i=0; i < $scope.grupos.length; i++){
      $scope.valorTotalGrupos += $scope.grupos[i].valorTotal;
    }
  });
  
  myApp.controller('comunsCtrl',function($scope){
    document.addEventListener("deviceready", function(){
      window.analytics.trackView('Inserir Gastos Comuns');  
    }, false);
    window.scrollTo(0,0);
    $scope.gastoComun = {
      nome : '',
      valor : '',
      qtde : '',
      pessoas : '',
      valorTotal : ''
    };
    
    $scope.gastosComuns = (sessionStorage.getItem('gastosComuns')===null) ? [] : JSON.parse(sessionStorage.getItem('gastosComuns')); 
    
    $scope.limpar = function(){
      $scope.gastosComuns = [];
      sessionStorage.removeItem('gastosComuns');
      $scope.anchor();
    };
    
    $scope.inserir = function(){
      $scope.gastoComun.valorTotal = $scope.gastoComun.valor * $scope.gastoComun.qtde / $scope.gastoComun.pessoas;
      
      $scope.gastosComuns.push($scope.gastoComun);
      
      $scope.gastoComun = {
        nome : '',
        valor : '',
        qtde : '',
        pessoas : '',
        valorTotal : ''
      };
      sessionStorage.setItem('gastosComuns',JSON.stringify($scope.gastosComuns));
      $scope.anchor();
    };
    
    $scope.deletar = function(gasto){
      var index = $scope.gastosComuns.indexOf(gasto);
      if(index > -1) {
        $scope.gastosComuns.splice(index,1);
        if($scope.gastosComuns.length === 0){
          sessionStorage.removeItem('gastosComuns');
        }else{
          sessionStorage.setItem('gastosComuns',JSON.stringify($scope.gastosComuns));
        } 
      }
    };
  });
  
  myApp.controller('igCtrl', function($scope,$mdToast){
    document.addEventListener("deviceready", function(){
      window.analytics.trackView('Inserir Grupos');  
    }, false);
    window.scrollTo(0,0);
    $scope.grupo = {
      nome : '',
      gastos : [],
      valorTotal : 0,
      dividir : '',
      trocos : []
    };
    
    $scope.grupos = (sessionStorage.getItem('grupos')===null) ? [] : JSON.parse(sessionStorage.getItem('grupos')); 
    
    $scope.valorTotalGrupos = 0;
    for(var i=0; i < $scope.grupos.length; i++){
      $scope.valorTotalGrupos += $scope.grupos[i].valorTotal;
    }
    
    $scope.inserir = function(){
      //Assume que não violação de chave primária
      var PK_violation = false;
      //Verifica se o nome do grupo já foi cadastrado
      for(var i =0; i < $scope.grupos.length; i++){
        PK_violation = PK_violation || ( ($scope.grupos[i].nome === $scope.grupo.nome) && i);
        if (PK_violation !== false) break;
      }
      //Se a violação for falsa, insere o grupo
      if(PK_violation === false){
        $scope.grupos.push($scope.grupo);
        $scope.grupo = {
          nome : '',
          gastos : [],
          valorTotal : 0,
          dividir : '',
          trocos : []
        };
        sessionStorage.setItem('grupos',JSON.stringify($scope.grupos));  
      }else{
        $mdToast.show( $mdToast.simple().textContent('Grupo Duplicado').hideDelay(3000) );
      }
    };
    
    $scope.limpar = function(){
      $scope.grupos = [];
      sessionStorage.removeItem('grupos');
      $scope.valorTotalGrupos = 0;
    };
    
    $scope.deletar = function(grupo){
      var index = $scope.grupos.indexOf(grupo);
      if(index > -1) {
        $scope.grupos.splice(index,1);
        $scope.valorTotalGrupos = 0;
        for(var i=0; i < $scope.grupos.length; i++){
          $scope.valorTotalGrupos += $scope.grupos[i].valorTotal;
        }
        if($scope.grupos.length === 0){
          sessionStorage.removeItem('grupos');
        }else{
          sessionStorage.setItem('grupos',JSON.stringify($scope.grupos));
        } 
      }     
    };
    
    $scope.editar = function(grupo){
      sessionStorage.setItem('editarGrupo',JSON.stringify(grupo));
    };
    
    $scope.shareWhatsapp = function(grupo){
      //Declara a variavel que armazena a mensagem
      var text = '';
      //Monta a mensagem
      text += grupo.nome + '\n\n';
      text += '*Valor:* R$ ' + Number(grupo.valorTotal).toFixed(2) + '\n';
      text += '*Valor + 10%:* R$ ' + Number(grupo.valorTotal * 1.1).toFixed(2) + '\n';
      if( (grupo.dividir !== '') && (grupo.dividir !== null) ){
        text += '*Valor Dividido Por ' + grupo.dividir + ":* R$ " + Number(grupo.valorTotal / grupo.dividir).toFixed(2) + '\n';
        text += '*Valor Dividido Por ' + grupo.dividir + " + 10%:* R$ " + Number(grupo.valorTotal / grupo.dividir * 1.1).toFixed(2) + '\n';
      }
      for(var i=0; i<grupo.trocos.length; i++){
        text += '*Troco para R$ ' + Number(grupo.trocos[i].valorPago).toFixed(2) + ':* R$ ' + Number(grupo.trocos[i].valorAReceber).toFixed(2) + '\n';
      }
      text += '\n_Calculado via Conta Restaurante_';
      //Codifica os caracteres para serem enviados via URL
      text = encodeURIComponent(text);
      //Compartilha
      openDeviceBrowser('whatsapp://send?text=' + text);
    };
    
  });
  
  myApp.controller('editarGrupoCtrl', function($scope, $mdToast){
    document.addEventListener("deviceready", function(){
      window.analytics.trackView('Editar Grupo');  
    }, false);
    window.scrollTo(0,0);
    $scope.grupos = (sessionStorage.getItem('grupos')===null) ? [] : JSON.parse(sessionStorage.getItem('grupos')); 
    $scope.grupo = JSON.parse(sessionStorage.getItem('editarGrupo'));
    
    //Encontra o indice do grupo
    var index = false;
    for(var i =0; i < $scope.grupos.length; i++){
      index = index || ( ($scope.grupos[i].nome === $scope.grupo.nome) && i);
      if (index !== false) break;
    }
    
    $scope.troco = {
      tipo : "1",
      gorjeta : 1.1,
      valorPago : '',
      valorAReceber : 0
    };
    
    console.log($scope.grupo);
    
    $scope.salvarDividir = function(){
      //Atualiza o Grupo
      $scope.grupos[index] = $scope.grupo;
      //Grava o Grupo
      sessionStorage.setItem('grupos',JSON.stringify($scope.grupos));
    };
    
    $scope.inserirTroco = function(){
      //Atualiza o grupo
      $scope.grupo.trocos.push($scope.troco);
      $scope.grupos[index] = $scope.grupo;
      //Grava o Grupo
      sessionStorage.setItem('grupos',JSON.stringify($scope.grupos));
      //Limpa o troco
      $scope.troco = {
        tipo : "1",
        gorjeta : 1.1,
        valorPago : '',
        valorAReceber : 0
      };
      //Alerta
      $mdToast.show( $mdToast.simple().textContent('Troco Calculado e Gravado').hideDelay(3000) );  
    };
    
    $scope.calcularTroco = function(){
      //Calcula o valor a receber
      console.log($scope.troco);
      switch($scope.troco.tipo){
        case "1":
          $scope.troco.valorAReceber = $scope.troco.valorPago - $scope.grupo.valorTotal * $scope.troco.gorjeta;
          $scope.inserirTroco();
          break;
        case "2":
          $scope.troco.valorAReceber = $scope.troco.valorPago - ($scope.grupo.valorTotal * $scope.troco.gorjeta / $scope.grupo.dividir);
          $scope.inserirTroco();
          break;
        default:
          $mdToast.show( $mdToast.simple().textContent('Erro').hideDelay(3000) );
          break;
      }
    };
    
    $scope.deletarTroco = function(troco){
      var ix = $scope.grupo.trocos.indexOf(troco);
      if(ix > -1) {
        $scope.grupo.trocos.splice(ix,1);
        //Atualiza o Grupo
        $scope.grupos[index] = $scope.grupo;
        //Grava o Grupo
        sessionStorage.setItem('grupos',JSON.stringify($scope.grupos));
      }
    };
    
  });
  
  myApp.controller('inserirGastosCtrl', function($scope, $mdToast){
    document.addEventListener("deviceready", function(){
      window.analytics.trackView('Inserir Gastos');  
    }, false);
    window.scrollTo(0,0);
    $scope.grupos = (sessionStorage.getItem('grupos')===null) ? [] : JSON.parse(sessionStorage.getItem('grupos')); 
    $scope.grupo = JSON.parse(sessionStorage.getItem('editarGrupo'));
    
    //Encontra o indice do grupo
    var index = false;
    for(var i =0; i < $scope.grupos.length; i++){
      index = index || ( ($scope.grupos[i].nome === $scope.grupo.nome) && i);
      if (index !== false) break;
    }
    
    //Define gasto
    $scope.gasto = {
      nome : '',
      valor : '',
      qtde : '',
      valorTotal : ''
    };
    
    $scope.showGastosComuns = false;
    $scope.gastoComun = "none";
    $scope.gastosComuns = (sessionStorage.getItem('gastosComuns')===null) ? [] : JSON.parse(sessionStorage.getItem('gastosComuns')); 
    
    $scope.selectGastoComun = function(gasto){
      $scope.gasto.nome = gasto.nome;
      $scope.gasto.valor = gasto.valorTotal;
    };
    
    $scope.selectNone = function(){
      $scope.gasto = {
        nome : '',
        valor : '',
        qtde : '',
        valorTotal : ''
      };
    };
    
    $scope.inserir = function(){
      //Assume que não violação de chave primária
      var PK_violation = false;
      //Verifica se o nome do item já foi cadastrado
      for(var i =0; i < $scope.grupos[index].gastos.length; i++){
        PK_violation = PK_violation || ( ($scope.grupos[index].gastos[i].nome === $scope.gasto.nome) && i);
        if (PK_violation !== false) break;
      }
      //Se a violação for falsa, insere o gasto
      if(PK_violation === false){
        //Calcula o valor total do gasto
        $scope.gasto.valorTotal = $scope.gasto.valor * $scope.gasto.qtde;
        //Atualiza o grupo editado, inserindo o gasto
        $scope.grupos[index].gastos.push($scope.gasto);
        //zera o valor total do grupo
        $scope.grupos[index].valorTotal = 0;
        //Atualizar o valor Total do grupo
        for(i = 0; i < $scope.grupos[index].gastos.length; i++){
          $scope.grupos[index].valorTotal += $scope.grupos[index].gastos[i].valorTotal;
        }
        //Atualiza o grupo
        $scope.grupo = $scope.grupos[index];
        //Grava o Grupo
        console.log($scope.grupos);
        sessionStorage.setItem('grupos',JSON.stringify($scope.grupos));
        //Limpa o gasto
        $scope.gasto = {
          nome : '',
          valor : '',
          qtde : '',
          valorTotal : ''
        };
      }else{
        $mdToast.show( $mdToast.simple().textContent('Item Duplicado').hideDelay(3000) );  
      }
      $scope.anchor();
    };
    
    $scope.limpar = function(){
      $scope.grupos[index].gastos = [];
      $scope.grupos[index].valorTotal = 0;
      $scope.grupo = $scope.grupos[index];
      sessionStorage.setItem('grupos',JSON.stringify($scope.grupos));
      $scope.anchor();
    };
    
    $scope.deletar = function(gasto){
      var ix = false;
      for(var i =0; i < $scope.grupos[index].gastos.length; i++){
        ix = ix || ( ($scope.grupos[index].gastos[i].nome === gasto.nome) && i);
        if (ix !== false) break;
      }
      
      if(ix !== false) {
        $scope.grupos[index].gastos.splice(ix,1);
        //zera o valor total do grupo
        $scope.grupos[index].valorTotal = 0;
        //Atualizar o valor Total do grupo
        for(i = 0; i < $scope.grupos[index].gastos.length; i++){
          $scope.grupos[index].valorTotal += $scope.grupos[index].gastos[i].valorTotal;
        }
        //Atualiza o grupo
        $scope.grupo = $scope.grupos[index];
        sessionStorage.setItem('grupos',JSON.stringify($scope.grupos));
      }
    };
  });
  
  myApp.controller('AppCtrl', function($scope, $mdMedia, $mdSidenav, $mdDialog, $element){
    $scope.anchor = function(){
      document.getElementById("myAnchor").focus();
      document.getElementById("myAnchor").blur();
    };
    
    $scope.next = function(ev){
      if(ev.keyCode == 13) document.getElementsByTagName("input")[(angular.element(ev.srcElement)[0].tabIndex)+1].focus();
    };
    
    $scope.toggleLeft = function(){
      $mdSidenav('left').toggle();
    };
    
    $scope.showSobreDialog = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        //controller: DialogController,
        controller: function($scope, $mdDialog, $mdSidenav){
          $mdSidenav('left').toggle();
        },
        templateUrl: 'views/sobre.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen:false
        //fullscreen: useFullScreen
      });
      
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };
  });
  
  myApp.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
    
    $scope.shareWhatsapp = function(){
      //Declara a variavel que armazena a mensagem
      var text = '';
      //Monta a mensagem
      text += 'https://play.google.com/store/apps/details?id=io.iltons.contarestaurante&referrer=utm_source%3Dapp%26utm_medium%3Dshare-link%26utm_campaign%3Dnone';
      //Codifica os caracteres para serem enviados via URL
      text = encodeURIComponent(text);
      //Compartilha
      openDeviceBrowser('whatsapp://send?text=' + text);
      document.addEventListener("deviceready", function(){
        window.analytics.trackEvent('menu', 'share-app');
      }, false);
    };
    
  });
  
  myApp.directive('toolbar', function(){
    return {
      restrict : 'E',
      templateUrl : 'partials/toolbar.html'
    };
  });
  
  myApp.directive('sidenav', function(){
    return {
      restrict : 'E',
      templateUrl : 'partials/sidenav.html'
    };
  });
  
})();