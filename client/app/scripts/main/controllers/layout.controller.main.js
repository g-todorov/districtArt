'use strict';
 
angular.module('Main')

  .controller('LayoutController', ['$scope', '$http', 'AuthService', 'API_ENDPOINT', '$state', function ($scope, $http, AuthService, API_ENDPOINT, $state) {
    $scope.authenticated = AuthService.isAuthenticated()
  }
]);
