'use strict';
 
angular.module('users').controller('PersonalPageController', PersonalPageController);
PersonalPageController.$inject = ['$scope', '$state', '$http', 'usersService', 'AuthService', 'API_ENDPOINT'];

function PersonalPageController($scope, $state, $http, usersService, AuthService, API_ENDPOINT) {
  var userProfileId = $state.params.userId;

  usersService.get({ id: userProfileId }, function(data) {
    $scope.userDetails = data;
    $scope.date = data.created
  });


  $http.get(API_ENDPOINT.url + '/artworks/getArtworksByUserId/', {params: {userId: userProfileId}}).then(function(result) {
    $scope.userArtworks = result.data;
    angular.forEach($scope.userArtworks, function(value, key) {
      if (value.visibility == 'private' && value.owners.indexOf(userProfileId) == -1) {
        value.hideProject = true
      }
      else {
        value.coverUrl = API_ENDPOINT.url + '/' + 'static/' + value.creator + '/' + value.artworkName + '/' + value.files[0].fileSystemName
      }
    });
  });
}
