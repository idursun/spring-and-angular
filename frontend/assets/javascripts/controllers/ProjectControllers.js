define(['angular'] , function(angular) {

    var app = angular.module('controllers.ProjectControllers', ['restangular', 'ui.router'])


    app.controller('ProjectListController', ['$scope', 'Restangular', function($scope, Restangular) {
        $scope.projects = [];
        var projects = Restangular.all('projects')

        projects.getList({ page: 1}).then(function(result) {
            console.log(result)
            $scope.projects = result;
        })

    }])

    app.controller('ProjectCreateController', ['$scope', function($scope) {
        $scope.project = {}

        $scope.save = function () {

            Restangular.all('projects').post($scope.project).then(function(result) {
                $state.go('^')
            })

        }

    }])

    app.controller('ProjectDetailController',
    ['$scope', '$state', 'Restangular',
    function($scope, $state, Restangular) {

        console.log('id is ' + $state.params.id)
        Restangular.one('projects', $state.params.id).get().then(function(project) {
            $scope.project = project;
            console.log('got ' + project)
        })

    }])

    return app;

})