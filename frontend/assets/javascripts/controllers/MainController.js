define(['angular'] , function(angular) {

    var app = angular.module('controllers.MainController', [])
    app.controller('MainController', ['$scope', function ($scope) {
        $scope.message = "message goes here"
    }])

})
