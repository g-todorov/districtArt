'use strict';
 
angular.module('studios').controller('mainStudiosController', ['$scope', 'studiosService', '$state', 'API_ENDPOINT', function ($scope, studiosService, $state, API_ENDPOINT) {

    $scope.find = function() {
      studiosService.query().$promise.then(function(result) {
        $scope.studios = result
        // angular.forEach($scope.artworks, function(value, key) {
        //   value.coverUrl = API_ENDPOINT.url + '/' + 'static/' + value.creator + '/' + value.artworkName + '/' + value.fileSystemNames[0]
        // });
      });
    };
  }
]);
