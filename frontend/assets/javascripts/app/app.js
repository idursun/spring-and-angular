define(['angular'], function (angular) {

  var app = angular.module('myApp',['restangular', 'ui.router'])

  app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.message = "message goes here"
  }])

  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
            .otherwise('home')

    $stateProvider.state('home', { url: '/', template: '<p>merhaba millet</p>' })
    $stateProvider.state('login', { url: '/login', templateUrl: 'templates/login.html' })
  })

  app.config(function($httpProvider) {
      $httpProvider.interceptors.push(function($q, $location) {
          return {'responseError' : function(rejection) {
              if(rejection.status == 401) {
                  $location.url('/login')
              }
              return $q.reject(rejection);
          }}
      })
  })

  app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/rest/')
  })

  app.directive('dialog', function($state) {
      return {
          restrict: 'A',
          link: function(scope, elem, attrs, ctrl) {
              scope.$on('$stateChangeSuccess', function(event, toState) {
                  if ($state.current.name == toState.name) {
                      elem.modal('show')
                  }
              })

              elem.on('hidden.bs.modal', function(e) {
                  $state.go('^')
              })
          }
      }
  })

  return app;
})
