define(['angular'], function (angular) {

  var app = angular.module('myApp', ['services', 'controllers', 'directives', 'restangular', 'ui.router'])

  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
            .otherwise('home')

    $stateProvider.state('home', { url: '/', templateUrl: 'templates/index.html', controller: 'MainController' })
        .state('login', { url: '/login', templateUrl: 'templates/login.html', controller: 'LoginController' })
        .state('projects', { url: '/projects?page&name', templateUrl: 'templates/project.list.html', controller: 'ProjectListController' })
        .state('project', { url: '/projects/:id', templateUrl: 'templates/project.detail.html', controller: 'ProjectDetailController' })
        .state('project.edit', { url: '/edit', templateUrl: 'templates/project.edit.html', controller: 'ProjectEditController' })
        .state('project.delete', { url: '/delete', templateUrl: 'templates/project.delete.html', controller: 'ProjectDeleteController' })
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
          if (operation === "getList" && data) {
            if ( what in data._embedded)
                 extractedData = data._embedded[what]
            else extractedData = data._embedded[Object.keys(data._embedded)[0]]

            extractedData.page = data.page || {number: 0, totalPages: 1};
          } else {
            extractedData = data;
          }
          return extractedData;
        });
  }])

  return app;
})
