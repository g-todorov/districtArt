'use strict';

angular.module('users').controller('LoginCtrl', LoginCtrl);
LoginCtrl.$inject = ['$scope', '$window', 'AuthService', '$state', 'socket'];

function LoginCtrl($scope, $window, AuthService, $state, socket) {
  $scope.user = {
    userName: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $window.location.reload();
      $state.go('projects-list');
      socket.connect()
    }, function(errMsg) {
        console.log(errMsg)
    });
  };

  $scope.goToRegister = function () {
    $state.go('register');
  }
}
