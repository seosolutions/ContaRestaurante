angular.module('ContaRestaurante')
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl : 'views/Pessoas/index.html',
        controller : 'PessoasController',
        controllerAs : 'PessoasCtrl'
      })
      .when('/Pessoas/new', {
        templateUrl : 'views/Pessoas/new.html',
        controller : 'PessoasController',
        controllerAs : 'PessoasCtrl'
      })
      .when('/Pessoas/:id', {
        templateUrl : 'views/Pessoas/show.html',
        controller : "PessoasController",
        controllerAs : "PessoasCtrl"
      })
      .when('/gastos-comuns', {
        templateUrl : 'views/GastosComuns/index.html'
      })
      .otherwise({redirectTo : '/'});
  });