'use strict';
 
angular.module('users').controller('personalPageController', ['$scope', '$state', '$http', 'usersService', 'AuthService', 'API_ENDPOINT',
  function ($scope, $state, $http, usersService, AuthService, API_ENDPOINT) {

    //$scope.currentUserId = window.localStorage.getItem('USER_ID');
    $scope.currentUserId = $state.params.userId;


    usersService.get({ id: $scope.currentUserId }, function(data) {
      $scope.currentUser = data;
    });


    $http.get(API_ENDPOINT.url + '/users/getUserArtworksById/' + $scope.currentUserId).then(function(result) {
      $scope.userArtworks = result.data;

      angular.forEach($scope.userArtworks, function(value, key) {
        value.coverUrl = API_ENDPOINT.url + '/' + 'static/' + value.creator + '/' + value.artworkName + '/' + value.fileSystemNames[0]
      });
    });

  }
]);
