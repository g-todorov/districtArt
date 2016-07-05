'use strict';
 
angular.module('artworks').controller('detailsController', ['$scope', 'Artworks', '$state', 'API_ENDPOINT', function ($scope, Artworks, $state, API_ENDPOINT) {

    // Find a list of Categories
    $scope.find = function() {
      //$scope.artwork = Artworks.query({name: $state.params.artworkName});
      Artworks.get({ id: $state.params.artworkId }, function(data) {
        $scope.artwork = data;
        $scope.image = [API_ENDPOINT.url + "/" + data.fileSystemName]
        console.log ($scope.images)
      });
    };
  }
]);
