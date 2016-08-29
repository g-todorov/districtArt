angular.module('users')

.controller('RegisterController', function($scope, AuthService, $state) {
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

})
