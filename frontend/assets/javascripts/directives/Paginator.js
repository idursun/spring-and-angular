define(['angular'] , function(angular) {
    var app = angular.module('directives.Paginator', [])
    return app.directive('paginator', function($state) {
          return {
              restrict: 'E',
              template: '<ul class="pagination">' +
                '<li ng-class="{disabled: isPrevDisabled() }"><a href="#">&laquo;</a></li>' +
                '<li ng-repeat="page in pages" ng-class="{active: page == current}" ><a href="#" >{{page}}</a></li>' +
                '<li ng-class="{disabled: isNextDisabled() }"><a href="#">&raquo;</a></li>' +
              '</ul>'
              ,
              scope: {
                totalPages: "=",
                number: "="
              },
              link: function(scope, elem, attrs, ctrl) {

                scope.current = 3

                scope.isPrevDisabled = function() {
                    return true;
                }

                scope.isNextDisabled = function() {
                    return false;
                }

                scope.pages = [1,2,3,4,5,6,7];
              }
          }
    })
})
