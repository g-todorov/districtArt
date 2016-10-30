'use strict';
 
angular.module('users').controller('UsersListCtrl', UsersListCtrl);
UsersListCtrl.$inject = ['$scope', '$http', 'usersService'];

function UsersListCtrl($scope, $http, usersService) {
  $scope.users = usersService.query();
}
