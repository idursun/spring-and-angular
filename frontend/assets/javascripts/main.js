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
      hammerjs: 'vendor/hammerjs/hammer',
      angularUi: 'vendor/angular-ui-router/angular-ui-router',
      angularAnimate: 'vendor/angular-animate/angular-animate',
      angularAria: 'vendor/angular-aria/angular-aria',
      angularMaterial: 'vendor/angular-material/angular-material'
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
      'hammerjs' : {
        exports: 'Hammer'
      },
      'angularUi': {
        deps: ['angular']
      }, 
      'angularAnimate' : {
        deps: ['angular']
      },
      'angularAria' : {
        deps: ['angular']
      },
      'angularMaterial' : {
        deps: ['angular', 'angularAnimate', 'angularAria', 'hammerjs']
      },
      'app/app' : {
        deps: ['restangular', 'hammerjs', 'angularUi', 'angularMaterial', 'services', 'directives', 'controllers']
      }
    },
    deps: ['angular'],
    packages: ['services', 'controllers', 'directives']
  }, ['jquery', 'angular', 'hammerjs', 'app/app'], function($, angular, Hammer, app) {
    $(document).ready(function () {
      window.Hammer = Hammer
      angular.resumeBootstrap();
    });
  });

}).call(this);
