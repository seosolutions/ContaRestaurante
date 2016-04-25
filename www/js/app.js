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