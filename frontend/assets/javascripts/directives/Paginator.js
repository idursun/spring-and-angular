define(['angular'] , function(angular) {
    var app = angular.module('directives.Paginator', [])
    return app.directive('paginator', function() {
          return {
              restrict: 'E',
              template: '<div class="pager"><a href="" class="btn btn-sm" ng-class="{disabled: page <= 1}" ng-click="handler({page: page-1})"><span class="glyphicon glyphicon-chevron-left"></span></a>' +
                '<select ng-model="page" ng-options="p for p in pages" ng-change="handler({page: page})">{{p}}</select>' +
                '/'+
                '<a href="" class="btn btn-sm" ng-click="handler({page: totalPages})">{{totalPages}}</a>' +
                '<a href="" class="btn btn-sm" ng-class="{disabled: page >= totalPages}" ng-click="handler({page: page+1})"><span class="glyphicon glyphicon-chevron-right"></span></a></div>'
              ,
              scope: {
                totalPages: "=",
                page: "=",
                handler: "&"
              },
              link: function(scope, elem, attrs, ctrl) {

                scope.$watch('totalPages', function(newValue) {

                    scope.pages = []
                    for(var i=1; i<=scope.totalPages; i++)
                        scope.pages.push(i)
                })

                scope.page = scope.page || 1;

              }
          }
    })
})
