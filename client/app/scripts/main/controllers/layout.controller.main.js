'use strict';
 
angular.module('Main')

  .controller('LayoutController', ['$scope', '$http', 'AuthService', 'API_ENDPOINT', '$state', function ($scope, $http, AuthService, API_ENDPOINT, $state) {
    //$scope.currentUserId = window.localStorage.getItem('USER_ID');
    $scope.authenticated = AuthService.isAuthenticated()
    // $scope.findMe = function() {
    //   $http.get(API_ENDPOINT.url + '/users/me').then(function(result) {
    //     debugger
    //     $scope.memberinfo = result.data.msg;
    //   });
    // };
    //Find a list of Categories
    // $scope.findMe = function() {
    //   usersService.get({ id: $scope.currentUserId }, function(data) {
    //     $scope.currentUser = data;
    //   });
    // };
    // $scope.goToLogin = function () {
    //   $state.go('login');
    //}

  }
]);
