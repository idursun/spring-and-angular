define(['angular'], function (angular) {

  var app = angular.module('myApp', ['services', 'controllers', 'directives', 'restangular', 'ui.router'])

  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
            .otherwise('home')

    $stateProvider.state('home', { url: '/', template: '<p>merhaba millet</p>' })
    $stateProvider.state('login', { url: '/login', templateUrl: 'templates/login.html' })
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

    TokenServiceProvider.setBaseUrl('http://localhost:8080/rest')
    TokenServiceProvider.setTokenUrl('/oauth/token')

    TokenServiceProvider.setLoginRedirectHandler(['$state', function($state) {
        $state.go('login')
    }])

  }])

  app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/rest/')
  })

  return app;
})
