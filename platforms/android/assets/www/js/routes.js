angular.module('ContaRestaurante')
  .config(function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl : 'views/pessoas/index.html'
      })
      .otherwise({redirectTo : '/'});
  });