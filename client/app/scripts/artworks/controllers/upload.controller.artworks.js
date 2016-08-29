'use strict';

angular.module('artworks').controller('uploadController', ['$scope', 'Artworks', '$state', 'API_ENDPOINT', 'Upload', function ($scope, Artworks, $state, API_ENDPOINT, Upload) {

  $scope.selectFiles = function (files) {
      $scope.files = files;
  };

  $scope.removeFile = function (file) {
    var index = $scope.files.indexOf(file);
    $scope.files.splice(index, 1);
  };

  $scope.uploadFiles = function (files) {

    if (files) {
      Upload.upload({
        url: API_ENDPOINT.url + '/artworks',
        arrayKey: '',
        data: {
          details: {
            userId: window.localStorage.getItem('USER_ID'),
            artworkName: $scope.artworkName,
            artworkDescription: $scope.artworkDescription
          },
          files: files
        }
      }).then(function (response) {
        $state.go('details', {artworkId: response.data._id});
      }, function (response) {
        if (response.status > 0) {
          $scope.errorMsg = response.status + ': ' + response.data;
        }
      }, function (evt) {
        $scope.progress =
          Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  };
}]);
