angular.module('ContaRestaurante')
  .config(function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl : 'views/pessoas/index.html'
      })
      .when('/gastos-comuns',{
        templateUrl : 'views/GastosComuns/index.html'
      })
      .otherwise({redirectTo : '/'});
  });