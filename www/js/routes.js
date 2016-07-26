angular.module('ContaRestaurante')
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl : 'views/Pessoas/index.html',
        controller : 'PessoasController'
      })
      .when('/Pessoas/new', {
        templateUrl : 'views/Pessoas/new.html',
        controller : 'PessoasController',
        controllerAs : 'PessoasCtrl'
      })
      .when('/gastos-comuns', {
        templateUrl : 'views/GastosComuns/index.html'
      })
      .otherwise({redirectTo : '/'});
  });