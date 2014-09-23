define(['angular'] , function(angular) {
    var app = angular.module('directives.Paginator', [])
    return app.directive('paginator', function($state) {
          return {
              restrict: 'E',
              template: '<ul class="pagination">' +
                '<li ng-class="{disabled: isPrevDisabled() }"><a href="" ng-click="handler({page: page-1})">&laquo;</a></li>' +
                '<li ng-repeat="p in pages" ng-class="{active: p == page}" ><a href="" ng-click="handler({page: p})" >{{p}}</a></li>' +
                '<li ng-class="{disabled: isNextDisabled() }"><a href="" ng-click="handler({page: page+1})">&raquo;</a></li>' +
              '</ul>'
              ,
              scope: {
                totalPages: "=",
                page: "=",
                handler: "&"
              },
              link: function(scope, elem, attrs, ctrl) {

                scope.$watch('totalPages', function(newValue) {
                    scope.pages = [];
                    for(var i = 1; i <= scope.totalPages; i++)
                        scope.pages.push(i)

                })

                scope.page = scope.page || 1;

                scope.isPrevDisabled = function() {
                    return scope.page <= 1;
                }

                scope.isNextDisabled = function() {
                    return scope.page == scope.totalPages;
                }

              }
          }
    })
})
