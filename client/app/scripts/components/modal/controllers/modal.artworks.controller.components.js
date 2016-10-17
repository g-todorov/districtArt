'use strict';
 
angular.module('Components').controller('ProjectsModalCtrl', ProjectsModalCtrl);
ProjectsModalCtrl.$inject = ['$scope', '$http', 'preSelectedArtworks', 'AuthService', 'Artworks', 'API_ENDPOINT'];

function ProjectsModalCtrl($scope, $http, preSelectedArtworks, AuthService, Artworks, API_ENDPOINT) {
  $scope.currentUserId = AuthService.getUserId();
  $scope.userArtworks = [];
  $scope.selectedArtworks = preSelectedArtworks;
  $scope.title = 'Select artworks'


  $http.get(API_ENDPOINT.url + '/users/getUserArtworksById/' + $scope.currentUserId).then(function(result) {
    $scope.userArtworks = result.data;

    angular.forEach($scope.userArtworks, function(value, key) {
      value.coverUrl = API_ENDPOINT.url + '/' + 'static/' + value.creator + '/' + value.artworkName + '/' + value.files[0].fileSystemName
      value.selected = preSelectedArtworks.some(function(el) {
        return el._id === value._id;
      });
    });
  });


  $scope.selectArtworks = function(artwork, selected, e) {
    if (selected) {
      $scope.selectedArtworks.push(artwork);
    } else {
      var index = $scope.selectedArtworks.indexOf(artwork);
      $scope.selectedArtworks.splice(index, 1)
    }
  }
}
