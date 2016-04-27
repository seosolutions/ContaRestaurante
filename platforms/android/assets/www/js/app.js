(function(){
  var myApp = angular.module('ContaRestaurante', ['ngMaterial']);
  
  myApp.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('grey');
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
  
  myApp.directive('igualmente', function(){
    return {
      restrict : 'E',
      templateUrl : 'views/igualmente.html',
      controller : function(){
        this.conta = {
          valorTotal : 0,
          gorjeta : "s",
          totalPessoas : 1
        };
        
        this.limpar = function(){
          this.conta = {
            valorTotal : 0,
            gorjeta : "s",
            totalPessoas : 1
          };
        };
      },
      controllerAs : 'igualmenteCtrl'
    };
  });
  
  myApp.directive('individualmente', function(){
    return {
      restrict : 'E',
      templateUrl : "views/individualmente.html",
      controller : function(){
        /*this.topDirections = ['left', 'up'];
        this.bottomDirections = ['down', 'right'];
        this.isOpen = false;
        this.availableModes = ['md-fling', 'md-scale'];
        this.selectedMode = 'md-fling';
        this.availableDirections = ['up', 'down', 'left', 'right'];
        this.selectedDirection = 'up';*/
        
        this.gastosComuns = (sessionStorage.getItem('gastosComuns')===null) ? [] : JSON.parse(sessionStorage.getItem('gastosComuns'));
        
        this.totalGastosComuns = 0;
        for(var i = 0; i < this.gastosComuns.length; i++){
          this.totalGastosComuns += (this.gastosComuns[i].valor * this.gastosComuns[i].qtde);
        }
        
      },
      controllerAs : 'indCtrl'
    };
  });
  
  myApp.directive('comuns', function(){
    return {
      restrict : 'E',
      templateUrl : 'views/comuns.html',
      controller : function(){
        this.gastoComun = {
          nome : "Nome do Item",
          valor : 0,
          qtde : 0,
          pessoas : 0,
          valorTotal : 0
        };
        
        this.gastosComuns = (sessionStorage.getItem('gastosComuns')===null) ? [] : JSON.parse(sessionStorage.getItem('gastosComuns')); 
        
        console.log(this.gastosComuns);
        
        this.limpar = function(){
          this.gastosComuns = [];
          sessionStorage.removeItem('gastosComuns');
        };
        
        this.inserir = function(){
          this.gastoComun.valorTotal = this.gastoComun.valor * this.gastoComun.qtde / this.gastoComun.pessoas;
          
          this.gastosComuns.push(this.gastoComun);
          
          this.gastoComun = {
            nome : "Nome do Item",
            valor : 0,
            qtde : 0,
            pessoas : 0,
            valorTotal : 0
          };
          console.log(this.gastosComuns);
          sessionStorage.setItem('gastosComuns',JSON.stringify(this.gastosComuns));
        };
        
        this.deletar = function(gasto){
          var index = this.gastosComuns.indexOf(gasto);
          if(index > -1) {
            this.gastosComuns.splice(index,1);
            if(this.gastosComuns.length === 0){
              sessionStorage.removeItem('gastosComuns');
            }else{
              sessionStorage.setItem('gastosComuns',JSON.stringify(this.gastosComuns));
            } 
          }
        };
      },
      controllerAs : 'comunsCtrl'
    };
  });
  
  myApp.directive('inserirGrupos', function(){
    return {
      restrict : 'E',
      templateUrl : 'views/inserir-grupos.html',
      controller : function(){
        this.grupo = {
          nome : '',
          gastos : []
        };
        
        this.grupos = (sessionStorage.getItem('grupos')===null) ? [] : JSON.parse(sessionStorage.getItem('grupos')); 
        
        this.inserir = function(){
          this.grupos.push(this.grupo);
          this.grupo = {
            nome : '',
            gastos : []
          };
          sessionStorage.setItem('grupos',JSON.stringify(this.grupos));
        };
        
        this.limpar = function(){
          this.grupos = [];
          sessionStorage.removeItem('grupos');
        };
        
        this.deletar = function(grupo){
          var index = this.grupos.indexOf(grupo);
          if(index > -1) {
            this.grupos.splice(index,1);
            if(this.grupos.length === 0){
              sessionStorage.removeItem('grupos');
            }else{
              sessionStorage.setItem('grupos',JSON.stringify(this.grupos));
            } 
          }     
        };
        
      },
      controllerAs : 'igCtrl'
    };
  });
  
  myApp.controller('AppCtrl', function($scope, $mdMedia, $mdSidenav){
    $scope.toggleLeft = function(){
      $mdSidenav('left').toggle();
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
  
})();