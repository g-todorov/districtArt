'use strict';

angular.module('projects').controller('CreateProjectCtrl', CreateProjectCtrl);
CreateProjectCtrl.$inject = ['$scope', 'Projects', '$state', 'API_ENDPOINT', 'Upload'];

function CreateProjectCtrl($scope, Projects, $state, API_ENDPOINT, Upload) {
  $scope.filesDictionary = {};
  $scope.visibility = 'public'


  $scope.preSelectVisibilityStatus = function(fileName){
    $scope.filesDictionary[fileName] = {
      projectItemTitle: '',
      projectItemDescription: ''
    }
  };


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
        url: API_ENDPOINT.url + '/projects',
        arrayKey: '',
        data: {
          details: {
            userId: window.localStorage.getItem('USER_ID'),
            projectName: $scope.projectTitle,
            projectDescription: $scope.projectDescription,
            visibility: $scope.visibility,
            filesDictionary: $scope.filesDictionary
          },
          files: files
        }
      }).then(function (response) {
        $state.go('project-details', {projectId: response.data._id});
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
}
