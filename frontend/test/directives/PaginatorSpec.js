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

        describe('When there are 5 pages and current page is 3: [1][2][3][4][5]', function() {

            beforeEach(function() {
                scope.totalPages = 5;
                scope.page = 3;
                scope.$digest()
            })

            it('should not have gaps', function() {
                var links = element.find('li')
                var count = 0
                for (var i = 0; i < links.length; i++) {
                    if (links.eq(i).hasClass('gap')) count++
                };
                expect(count).toBe(0)
            })

            it('should have 5 visible page links', function() {
                var links = element.find('li')
                var count = 0
                for (var i = 1; i < links.length-1; i++) {
                    if (!links.eq(i).hasClass('gap')) count++
                };
                expect(count).toBe(5)
            })

        })

        describe('When there are 6 pages and current page is 1: [1][2][3][4][5]', function() {

            beforeEach(function() {
                scope.totalPages = 6;
                scope.page = 1;
                scope.$digest()
            })

            it('should not have gaps', function() {
                var links = element.find('li')
                var count = 0
                for (var i = 0; i < links.length; i++) {
                    if (links.eq(i).hasClass('gap')) count++
                };
                expect(count).toBe(0)
            })

        })


        describe('When there are 20 pages and current page is 10: [1][2]...[8][9][10][11][12]...[19][20]', function() {

            beforeEach(function() {
                scope.totalPages = 20;
                scope.page = 10;
                scope.$digest()
            })

            it('should have links to page 1, 2', function() {
                var links = element.find('li a')
                expect(links.eq(1).text()).toBe("1")
                expect(links.eq(2).text()).toBe("2")
            })

            it('should have gap', function() {
                var links = element.find('li')
                expect(links.eq(3).text()).toBe("...")
            })

            it('should have 9 page links', function() {
                var links = element.find('li a')
                expect(links.eq(4).text()).toBe("8")
                expect(links.eq(5).text()).toBe("9")
                expect(links.eq(6).text()).toBe("10")
            })

        })

    });

})