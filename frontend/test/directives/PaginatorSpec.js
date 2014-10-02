define(['angular', 'lodash', 'angularMocks', 'angularUi', 'directives'], function(angular, _) {

    describe('Paginator', function () {

        var element, scope, $compile, $rootScope;

        beforeEach(angular.mock.module('directives.Paginator'));

        beforeEach(inject(function(_$rootScope_, _$compile_) {
            $compile = _$compile_
            $rootScope = _$rootScope_;
            scope = _$rootScope_.$new();
            element = angular.element('<paginator total-pages="totalPages" page="page" handler="goToPage(page)"></paginator>')
            $compile(element)(scope);
        }))

        describe('When there are 10 pages and current page is 1', function() {

            beforeEach(function() {
                scope.totalPages = 10;
                scope.page = 1;
                scope.$digest()
            })

            it('prev button should be disabled', function() {
                var links = element.find('a')
                expect(links.eq(0).hasClass('disabled')).toBe(true)
            })

            it('next button should be enabled', function() {
                var links = element.find('a')
                expect(links.eq(links.length-1).hasClass('disabled')).toBe(false)
            })

        })

        describe('When there are 10 pages and current page is 10', function() {

            beforeEach(function() {
                scope.totalPages = 10;
                scope.page = 10;
                scope.$digest()
            })

            it('prev button should be enabled', function() {
                var links = element.find('a')
                expect(links.eq(0).hasClass('disabled')).toBe(false)
            })

            it('next button should be disabled', function() {
                var links = element.find('a')
                expect(links.eq(links.length-1).hasClass('disabled')).toBe(true)
            })
        })

    });

})