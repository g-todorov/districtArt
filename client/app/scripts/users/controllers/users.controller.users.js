'use strict';
 
angular.module('users').controller('usersController', ['$scope', '$http', 'usersService', 'AuthService', 'API_ENDPOINT', function ($scope, $http, usersService, AuthService, API_ENDPOINT) {
    $scope.currentUserId = window.localStorage.getItem('USER_ID');
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

    $scope.users = usersService.query();
  }
]);
