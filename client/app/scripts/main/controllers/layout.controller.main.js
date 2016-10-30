'use strict';
 
angular.module('Main').controller('LayoutController', LayoutController);
LayoutController.$inject = ['$scope', '$http', 'AuthService', 'API_ENDPOINT', '$state'];

function LayoutController($scope, $http, AuthService, API_ENDPOINT, $state) {
  $scope.authenticated = AuthService.isAuthenticated();
}
