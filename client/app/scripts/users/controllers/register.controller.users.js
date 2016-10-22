'use strict';

angular.module('users').controller('RegisterCtrl', RegisterCtrl);
RegisterCtrl.$inject = ['$scope', 'AuthService', '$state'];

function RegisterCtrl($scope, AuthService, $state) {
  $scope.user = {
    userName: '',
    password: '',
    role: 'user'
  };

  $scope.register = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('main');
    }, function(errMsg) {
        console.log(errMsg)
    });
  };
}
