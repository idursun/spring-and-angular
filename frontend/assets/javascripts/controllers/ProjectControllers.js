define(['angular'] , function(angular) {

    var app = angular.module('controllers.ProjectControllers', ['restangular', 'ui.router'])


    app.controller('ProjectListController', ['$scope', 'Restangular', '$state', '$stateParams', function($scope, Restangular, $state, $stateParams) {
        $scope.projects = [];

        $scope.goToPage = function(p) {
            $state.go('projects', { page: p})
        }

        var projects = Restangular.all('projects')

        projects.getList({ page: $stateParams.page }).then(function(result) {
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