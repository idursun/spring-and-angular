define(['angular'] , function(angular) {

    var app = angular.module('controllers.MainController', ['restangular', 'ui.router'])
    app.controller('MainController', ['$scope', 'Restangular', '$state', function ($scope, Restangular, $state) {
        Restangular.all('projects').getList().then(function(data) {
            $scope.projects = data;
        })
    }])

})
