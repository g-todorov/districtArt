'use strict';
 
angular.module('artworks').controller('uploadController', ['$scope', 'Artworks', '$state', 'API_ENDPOINT', 'FileUploader', function ($scope, Artworks, $state, API_ENDPOINT, FileUploader) {

  var uploader = $scope.uploader = new FileUploader({
    url: API_ENDPOINT.url + '/artworks',
    formData: [{userId: window.localStorage.getItem('USER_ID')}],
    removeAfterUpload: true
  });

  uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
  });

  uploader.onBeforeUploadItem = function(item) {
    item.formData.push({fileName: $scope.fileName})
    item.formData.push({description: $scope.description})
  };

  uploader.onCompleteAll = function () {
    //document.getElementById('newsfeed-upload').value = null
  };

  uploader.onAfterAddingFile  = function (item) {
  };

  // $scope.test = function () {
  //   console.log($scope.fileName);
  // }
  // $scope.uploadFile = function(){
  //   console.log('test1')
  //   debugger
  //    $scope.fileSelected = function(files) {
  //        console.log('test2')
  //        if (files && files.length) {
  //           $scope.file = files[0];
  //        }
  //
  //        FileUploader.upload({
  //          url: '/api/upload’', //node.js route
  //          file: $scope.file
  //        })
  //        .success(function(data) {
  //          console.log(data, 'uploaded');
  //         });
  //
  //       };
  //   };


}]);
