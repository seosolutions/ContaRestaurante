angular.module('ContaRestaurante')
  .controller('ContaRestauranteController', function($scope, $mdSidenav){
    $scope.toggleLeft = function(){
      $mdSidenav('left').toggle();
    };
    
    $scope.closeLeft = function(){
      $mdSidenav('left').close();
    };
    
    $scope.exibirGorjeta = true;
    
  });