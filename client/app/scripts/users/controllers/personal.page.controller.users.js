'use strict';
 
angular.module('users').controller('PersonalPageController', PersonalPageController);
PersonalPageController.$inject = ['$scope', '$state', '$http', 'usersService', 'AuthService', 'API_ENDPOINT'];

function PersonalPageController($scope, $state, $http, usersService, AuthService, API_ENDPOINT) {
  var currentUserId = AuthService.getUserId();
  $scope.currentUserId = $state.params.userId;


  usersService.get({ id: $scope.currentUserId }, function(data) {
    $scope.currentUser = data;
  });


  $http.get(API_ENDPOINT.url + '/users/getUserArtworksById/' + $scope.currentUserId).then(function(result) {
    $scope.userArtworks = result.data;

    angular.forEach($scope.userArtworks, function(value, key) {
      if (value.visibility == 'private' && value.owners.indexOf(currentUserId) == -1) {
        value.hideProject = true
      }
      else {
        value.coverUrl = API_ENDPOINT.url + '/' + 'static/' + value.creator + '/' + value.artworkName + '/' + value.files[0].fileSystemName
      }
    });
  });
}
