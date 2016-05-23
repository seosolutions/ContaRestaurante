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
    .when('/editar-grupos', {
      templateUrl : 'views/editar-grupos.html',
      controller : 'egCtrl'
    })
    .otherwise ({ redirectTo: '/' });
    
  });
  
  myApp.controller('igualmenteCtrl', function($scope,$mdSidenav){
    window.scrollTo(0,0);
    $mdSidenav('left').close();
    
    $scope.conta = {
      valorTotal : 0,
      gorjeta : "s",
      totalPessoas : 1
    };
    
    $scope.limpar = function(){
      $scope.conta = {
        valorTotal : 0,
        gorjeta : "s",
        totalPessoas : 1
      };
    };
  });
  
  myApp.controller('individualmenteCtrl', function($scope,$mdSidenav){
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
    window.scrollTo(0,0);
    $scope.gastoComun = {
      nome : "",
      valor : 0,
      qtde : 0,
      pessoas : 0,
      valorTotal : 0
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
        nome : "",
        valor : 0,
        qtde : 0,
        pessoas : 0,
        valorTotal : 0
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
    window.scrollTo(0,0);
    $scope.grupo = {
      nome : '',
      gastos : [],
      valorTotal : 0
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
          valorTotal : 0
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
  });
  
  myApp.controller('egCtrl', function($scope, $mdToast){
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
      valor : 0,
      qtde : 0,
      valorTotal : 0
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
        valor : 0,
        qtde : 0,
        valorTotal : 0
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
          valor : 0,
          qtde : 0,
          valorTotal : 0
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
  
  myApp.controller('AppCtrl', function($scope, $mdMedia, $mdSidenav, $mdDialog){
    $scope.anchor = function(){
      document.getElementById("myAnchor").focus();
      document.getElementById("myAnchor").blur();
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