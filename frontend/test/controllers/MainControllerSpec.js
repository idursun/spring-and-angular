define(['angular','angularMocks', 'controllers', 'restangular', 'angularUi'], function (angular, mocks) {
  describe('MainCtrl', function () {
    var $scope, ctrl;

    beforeEach(module('controllers.MainController'))

    beforeEach(inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();

      ctrl = $controller('MainController', {
        '$scope': $scope
      });

    }))

    it('should set message', function () {
      expect($scope.message).toBeDefined();
    })

  })
})
