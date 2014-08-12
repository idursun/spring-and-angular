define(['angular'] , function(angular) {

    var app = angular.module('controllers.LoginController', [])
    app.controller('LoginController', ['$scope', '$state', 'TokenService', 'TokenStore', function ($scope, $state, TokenService, TokenStore) {
        $scope.user = {username:'user0', password:'123450'}

        $scope.login = function() {
            TokenService
                .login($scope.user.username, $scope.user.password)
                .then(function(data) {
                    TokenStore.set(data.access_token)
                    $state.go('home')
                }, function() {
                    console.log("error occurred")
                })
        }
    }])

})
