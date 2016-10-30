'use strict';
 
angular.module('Components').controller('ProjectsModalCtrl', ProjectsModalCtrl);
ProjectsModalCtrl.$inject = ['$scope', '$http', 'preSelectedProjects', 'AuthService', 'Projects', 'API_ENDPOINT'];

function ProjectsModalCtrl($scope, $http, preSelectedProjects, AuthService, Projects, API_ENDPOINT) {
  $scope.currentUserId = AuthService.getUserId();
  $scope.userProjects = [];
  $scope.selectedProjects = preSelectedProjects;
  $scope.title = 'Select projects'


  $http.get(API_ENDPOINT.url + '/projects/getProjectsByUserId/', {params: {userId: $scope.currentUserId}}).then(function(result) {
    $scope.userProjects = result.data;

    angular.forEach($scope.userProjects, function(value, key) {
      value.coverUrl = API_ENDPOINT.url + '/' + 'static/' + value.creator + '/' + value.projectName + '/' + value.files[0].fileSystemName
      value.selected = preSelectedProjects.some(function(el) {
        return el._id === value._id;
      });
    });
  });


  $scope.selectProjects = function(project, selected, e) {
    if (selected) {
      $scope.selectedProjects.push(project);
    } else {
      var index = $scope.selectedProjects.indexOf(project);
      $scope.selectedProjects.splice(index, 1)
    }
  }
}
