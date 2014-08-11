define(['angular'] , function(angular) {

    var app = angular.module('controllers.LoginController', [])
    app.controller('LoginController', ['$scope', 'TokenService', 'TokenStore', function ($scope, TokenService, TokenStore) {
        $scope.user = {username:'user0', password:'123450'}

        $scope.login = function() {
            TokenService
                .login($scope.user.username, $scope.user.password)
                .then(function(data) {
                    TokenStore.set(data.access_token)
                }, function() {
                    console.log("error occurred")
                })
        }
    }])

})
