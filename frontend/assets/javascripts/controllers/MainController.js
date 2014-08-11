define(['angular'] , function(angular) {

    var app = angular.module('controllers.MainController', ['restangular', 'ui.router'])
    app.controller('MainController', ['$scope', 'Restangular', function ($scope, Restangular) {
        $scope.message = "message goes here"
        $scope.projects = ['a', 'b', 'c']
        Restangular.all('projects').getList().then(function(data) {
            $scope.projects = data;
        })
    }])

})
