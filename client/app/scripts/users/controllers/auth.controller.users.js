angular.module('users')

.controller('RegisterCtrl', function($scope, AuthService, $state) {
  $scope.user = {
    userName: '',
    password: ''
  };

  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('outside.login');
      console.log('success')
    }, function(errMsg) {
       console.log(errMsg)
    });
  };
})

.controller('InsideCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
  $scope.destroySession = function() {
    AuthService.logout();
  };

  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/memberinfo').then(function(result) {
      $scope.memberinfo = result.data.msg;
    });
  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('outside.login');
  };
})

// .controller('AppCtrl', function($scope, $state, AuthService, AUTH_EVENTS) {
//   $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
//     AuthService.logout();
//     $state.go('outside.login');
//     console.log(errMsg)
//   });
// });
