define(['angular'] , function(angular) {

    var app = angular.module('controllers.ProjectControllers', ['restangular', 'ui.router'])


    app.controller('ProjectListController', ['$scope', 'Restangular', '$state', '$stateParams', function($scope, Restangular, $state, $stateParams) {
        $scope.projects = [];

        $scope.goToPage = function(p) {
            $state.go('projects', { page: p})
        }

        $scope.search = function() {
            $state.go('projects', { name: $scope.name || ""})
        }

        var projects = Restangular.all('projects')

        if ($stateParams.name) {
            projects = projects.all('search').all('findByNameContains')
        }

        projects.getList({ page: $stateParams.page, name: $stateParams.name }).then(function(result) {
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

        $scope.issues = []

        Restangular.one('projects', $state.params.id).get().then(function(project) {
            $scope.project = project;
        })

        Restangular.one('projects', $state.params.id).all('issues').getList().then(function(issues) {
           $scope.issues = issues;
        });

    }])

    return app;

})