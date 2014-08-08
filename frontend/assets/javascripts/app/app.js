define(['angular'], function (angular) {

  var app = angular.module('myApp', ['services', 'controllers', 'directives', 'restangular', 'ui.router'])

  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
            .otherwise('home')

    $stateProvider.state('home', { url: '/', template: '<p>merhaba millet</p>', controller: 'MainController' })
    $stateProvider.state('login', { url: '/login', templateUrl: 'templates/login.html', controller: 'LoginController' })
  })

  app.config(['$httpProvider','TokenServiceProvider', function($httpProvider, TokenServiceProvider) {
    $httpProvider.interceptors.push(function($q, $location) {
      return {'responseError' : function(rejection) {
          if(rejection.status == 401) {
              $location.url('/login')
          }
          return $q.reject(rejection);
      }}
    })

    console.log(TokenServiceProvider)

    //TokenServiceProvider.setBaseUrl('http://localhost:8080/rest')
    TokenServiceProvider.setTokenUrl('http://localhost:8080/oauth/token')
    TokenServiceProvider.setClientDetails('web', 'secret')
    TokenServiceProvider.loginRedirectHandler = ['$state', function($state) {
        $state.go('login')
    }]

  }])

  app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/rest/')
  })

  return app;
})
