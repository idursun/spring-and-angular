define(['angular', './MainController', './LoginController', './ProjectControllers'], function(angular) {

    return angular.module('controllers', [
        'controllers.MainController'
        ,'controllers.LoginController'
        ,'controllers.ProjectControllers'
    ]);

})