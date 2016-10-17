'use strict';
 
angular.module('artworks').controller('ProjectsListCtrl', ProjectsListCtrl);
ProjectsListCtrl.$inject = ['$scope', 'Artworks', '$state', 'API_ENDPOINT', 'AuthService'];

function ProjectsListCtrl($scope, Artworks, $state, API_ENDPOINT, AuthService) {
  var currentUserId = AuthService.getUserId();

  Artworks.query().$promise.then(function(result) {
    $scope.artworks = result;
    angular.forEach($scope.artworks, function(value, key) {
      if (value.visibility == 'private' && value.owners.indexOf(currentUserId) == -1) {
        value.hideProject = true
      } else {
        value.coverUrl = API_ENDPOINT.url + '/static/' + value.creator + '/' + value.artworkName + '/' + value.files[0].fileSystemName
      }
    });
  });
}
