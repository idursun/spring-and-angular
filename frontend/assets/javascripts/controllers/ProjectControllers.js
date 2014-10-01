define(['angular'] , function(angular) {

    var app = angular.module('controllers.ProjectControllers', ['restangular', 'ui.router'])


    app.controller('ProjectListController', ['$scope', '$state', 'projects', function($scope, $state, projects) {
        $scope.projects = projects;

        $scope.goToPage = function(p) {
            $state.go('projects', { page: p})
        }

        $scope.search = function() {
            $state.go('projects', { name: $scope.name || ""})
        }
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
    ['$scope', 'project', 'issues',
    function($scope, project, issues) {
        $scope.project = project
        $scope.issues = issues
    }])

    return app;

})