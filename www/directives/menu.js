angular.module('ContaRestaurante')
  .directive('menu', function(){
    return {
      restrict : 'E',
      templateUrl : 'templates/menu.html'
    };
  });