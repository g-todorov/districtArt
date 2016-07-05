'use strict';
 
angular.module('artworks').controller('mainController', ['$scope', 'Artworks', '$state', function ($scope, Artworks, $state) {

    // Find a list of Categories
    $scope.find = function() {
      $scope.artworks = Artworks.query();
    };
  }
]);
