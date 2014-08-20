define(['angular'], function (angular) {

  var app = angular.module('myApp', ['services', 'controllers', 'directives', 'restangular', 'ui.router'])

  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
            .otherwise('home')

    $stateProvider.state('home', { url: '/', templateUrl: 'templates/index.html', controller: 'MainController' })
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

    //TokenServiceProvider.setBaseUrl('http://localhost:8080/rest')
    TokenServiceProvider.setTokenUrl('http://localhost:8080/oauth/token')
    TokenServiceProvider.setClientDetails('web', 'secret')
    TokenServiceProvider.setLoginRedirectHandler( ['$state', function($state) {
        $state.go('login')
    }])

  }])

  app.config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:8080/rest/')

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
          var extractedData;
          if (operation === "getList") {
            extractedData = data._embedded[what]
            //extractedData.meta = data.data.meta;
          } else {
            extractedData = data[what];
          }
          return extractedData;
        });
  }])

  return app;
})
