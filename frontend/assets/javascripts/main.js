(function() {
  'use strict';

  window.name = 'NG_DEFER_BOOTSTRAP!';

  require({
    urlArgs: "b=" + ((new Date()).getTime()),
    paths: {
      jquery: 'vendor/jquery/jquery',
      angular: 'vendor/angular/angular',
      bootstrap: 'vendor/bootstrap/bootstrap',
      lodash: 'vendor/lodash/lodash.compat',
      restangular: 'vendor/restangular/restangular',
      angularUi: 'vendor/angular-ui-router/angular-ui-router'
    },
    shim: {
      'angular' : {
        deps: ['jquery'],
        exports: 'angular'
      },
      'bootstrap': {
        deps: ['jquery']
      },
      'restangular': {
        deps:['lodash', 'angular']
      },
      'angularUi': {
        deps: ['angular']
      },
      'app/app' : {
        deps: ['restangular', 'angularUi']
      }
    },
    deps: ['angular']
  }, ['jquery','angular', 'app/app', 'restangular', 'angularUi'], function($, angular, app) {
    $(document).ready(function () {
      angular.resumeBootstrap();
    });
  });

}).call(this);
