'use strict';
 
angular.module('artworks').controller('detailsController', ['$scope', 'Artworks', '$state', 'API_ENDPOINT', function ($scope, Artworks, $state, API_ENDPOINT) {

    // Find a list of Artwork items
    $scope.find = function() {
      //$scope.artwork = Artworks.query({name: $state.params.artworkName});
      Artworks.get({ id: $state.params.artworkId }, function(data) {
        $scope.artwork = data;
        $scope.artworkPieces = []

        angular.forEach(data.fileSystemNames, function(value, key) {
          this.push(API_ENDPOINT.url + '/' + 'static/' + $scope.artwork.creator + '/' + $scope.artwork.artworkName + '/' + value);
        }, $scope.artworkPieces);

      });
    };
  }
]);
