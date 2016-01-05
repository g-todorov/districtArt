'use strict';
 
angular.module('artworks').controller('mainController', ['$scope', 'Artworks', function ($scope, Artworks) {

    // Find a list of Categories
    $scope.find = function() {
      $scope.artworks = Artworks.query();
    };

  }
]);
