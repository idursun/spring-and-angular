define(['angular'] , function(angular) {

    var app = angular.module('controllers.MainController', [])
    app.controller('MainCtrl', ['$scope', function ($scope) {
        $scope.message = "message goes here"
    }])

})
