'use strict';
 
angular.module('Components').controller('artworksModalController', ['$rootScope', '$scope', '$timeout', '$http', 'socket', '$modal', 'preSelectedArtworks', 'studiosService', 'Invitations', 'Artworks', '$state', 'API_ENDPOINT',
  function ($rootScope, $scope, $timeout, $http, socket, $modal, preSelectedArtworks, studiosService, Invitations, Artworks, $state, API_ENDPOINT) {

    $scope.currentUserId = window.localStorage.getItem('USER_ID');
    $scope.userArtworks = [];
    $scope.selectedArtworks = preSelectedArtworks;
    $scope.title = 'Select artworks'


    $http.get(API_ENDPOINT.url + '/users/getUserArtworksById/' + $scope.currentUserId).then(function(result) {
      $scope.userArtworks = result.data;

      angular.forEach($scope.userArtworks, function(value, key) {
        value.coverUrl = API_ENDPOINT.url + '/' + 'static/' + value.creator + '/' + value.artworkName + '/' + value.fileSystemNames[0]
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
]);
