define(['angular'] , function(angular) {
    var app = angular.module('directives.Paginator', [])
    return app.directive('paginator', function() {
          return {
              restrict: 'E',
              template: '<ul class="pagination">' +
                '<li ng-class="{disabled: isPrevDisabled() }"><a href="" ng-click="handler({page: page-1})">&laquo;</a></li>' +
                '<li ng-repeat="p in pages track by $index" ng-class="{active: p == page, gap: p ==\'...\'}"><a href="" ng-click="handler({page: p})" >{{p}}</a></li>' +
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

                    scope.pages = []
                    if (scope.totalPages > 9) {
                        var mid = []
                        for(var i= scope.page-2; i < scope.page +2; i++) {
                            if (i > 0 && i <= scope.totalPages) mid.push(i)
                        }

                        var front = []
                        if (mid.indexOf(1) == -1) front.push(1)
                        if (mid.indexOf(2) == -1) front.push(2)

                        var last = []
                        if (mid.indexOf(scope.totalPages-1) == -1) last.push(scope.totalPages-1)
                        if (mid.indexOf(scope.totalPages) == -1) last.push(scope.totalPages)

                        if (mid[0] - front[front.length-1]>1) front.push("...")
                        if (1 < last[0] - mid[mid.length-1]) mid.push("...")

                        scope.pages = front.concat(mid).concat(last)
                    } else {
                        for(var i=1; i<=scope.totalPages; i++) scope.pages.push(i)
                    }

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
