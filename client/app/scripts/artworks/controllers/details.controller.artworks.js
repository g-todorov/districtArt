'use strict';

angular.module('artworks').controller('ProjectDetailsCtrl', ProjectDetailsCtrl);
ProjectDetailsCtrl.$inject = ['$scope', '$http', 'Artworks', '$state', 'API_ENDPOINT', 'AuthService'];

function ProjectDetailsCtrl($scope, $http, Artworks, $state, API_ENDPOINT, AuthService) {
  var currentUserId = AuthService.getUserId();
  $scope.viewMode = 'read';

  $scope.isAuthorized = function() {
    if ($scope.artwork) {
      return $scope.artwork.owners.indexOf(currentUserId) != -1;
    }
  }


  $scope.saveChanges = function() {
    $http.put(API_ENDPOINT.url + '/artworks/' + $scope.artwork._id, {visibility: $scope.artwork.visibility}).then(function(result) {
      $scope.viewMode = 'read';
    });
  }


  $scope.enterEditMode = function() {
    $scope.viewMode = 'edit';
  }


  Artworks.get({ id: $state.params.artworkId }, function(data) {
    $scope.artwork = data;
    // $scope.projectVisibility = data.visibility
    angular.forEach(data.files, function(value, key) {
      value.datailUrl = API_ENDPOINT.url + '/static/' + $scope.artwork.creator + '/' + $scope.artwork.artworkName + '/' + value.fileSystemName;
    });
  });
}
