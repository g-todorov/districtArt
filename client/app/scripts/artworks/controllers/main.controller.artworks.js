'use strict';
 
angular.module('artworks').controller('mainController', ['$scope', 'Artworks', '$state', 'API_ENDPOINT', function ($scope, Artworks, $state, API_ENDPOINT) {

    Artworks.query().$promise.then(function(result) {
      $scope.artworks = result
      angular.forEach($scope.artworks, function(value, key) {
        value.coverUrl = API_ENDPOINT.url + '/' + 'static/' + value.creator + '/' + value.artworkName + '/' + value.fileSystemNames[0]
      });
    });
  }
]);
