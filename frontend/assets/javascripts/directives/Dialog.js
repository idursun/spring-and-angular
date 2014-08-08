define(['angular'] , function(angular) {
    var app = angular.module('directives.Dialog', [])
    return app.directive('dialog', function($state) {
          return {
              restrict: 'A',
              link: function(scope, elem, attrs, ctrl) {
                  scope.$on('$stateChangeSuccess', function(event, toState) {
                      if ($state.current.name == toState.name) {
                          elem.modal('show')
                      }
                  })

                  elem.on('hidden.bs.modal', function(e) {
                      $state.go('^')
                  })
              }
          }
    })
})
