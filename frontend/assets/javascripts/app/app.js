define(['angular'], function (angular) {

  var app = angular.module('myApp',['restangular', 'ui.router'])

  app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.message = "message goes here"
  }])

  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
            .otherwise('home')
    $stateProvider.state('home', { url: '/', template: '<p>merhaba millet</p>' })
  })

  return app;
})
