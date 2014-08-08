define(['angular'] , function(angular) {

    var app = angular.module('controllers.LoginController', [])
    app.controller('LoginController', ['$scope', 'TokenService', function ($scope, TokenService) {
        $scope.user = {username:'user0', password:'123450'}

        $scope.login = function() {
            TokenService.login($scope.user.username, $scope.user.password)
        }
    }])

})
