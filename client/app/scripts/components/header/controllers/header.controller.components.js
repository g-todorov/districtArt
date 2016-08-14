'use strict';
 
angular.module('Components').controller('HeaderController', ['$scope', 'AuthService', '$state', '$location', function ($scope, AuthService, $state, $location ) {
    $scope.isAuthenticated = function () { return AuthService.isAuthenticated() }


    $scope.goToLogin = function () {
      $state.go('login');
    }


    $scope.goToUpload = function () {
      $state.go('upload');
    }


    $scope.logout = function() {
      AuthService.logout();
      $state.go('login');
    };


    $scope.isActive = function(route) {
      return route === $location.path();
    };


    $scope.getUserName = function () {
      return window.localStorage.getItem('USER_NAME');
    }


    $scope.goTopersonalPage = function () {
      $state.go('personal-page', {userId: window.localStorage.getItem('USER_ID')});
    }


    $scope.goToCreateStudio = function () {
      $state.go('create-studio');
    }

  }
]);
