define(['angular','angularMocks', 'controllers'], function (angular, mocks) {
  describe('MainCtrl', function () {
    var $scope, ctrl;

    beforeEach(module('controllers.MainController'))

    beforeEach(inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();

      ctrl = $controller('MainCtrl', {
        '$scope': $scope
      });

    }))

    it('should set message', function () {
      expect($scope.message).toBeDefined();
    })

  })
})
