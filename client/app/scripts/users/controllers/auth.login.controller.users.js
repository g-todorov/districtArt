angular.module('users')

.controller('login', function($scope, AuthService, $state) {
  $scope.user = {
    userName: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('main');
    }, function(errMsg) {
        console.log(errMsg)
    });
  };

  $scope.goToRegister = function () {
    $state.go('register');
  }
})
