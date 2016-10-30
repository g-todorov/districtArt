'use strict';
 
angular.module('projects').controller('ProjectsListCtrl', ProjectsListCtrl);
ProjectsListCtrl.$inject = ['$scope', 'Projects', '$state', 'API_ENDPOINT', 'AuthService'];

function ProjectsListCtrl($scope, Projects, $state, API_ENDPOINT, AuthService) {
  var currentUserId = AuthService.getUserId();

  Projects.query().$promise.then(function(result) {
    $scope.projects = result;
    angular.forEach($scope.projects, function(value, key) {
      if (value.visibility == 'private' && value.owners.indexOf(currentUserId) == -1) {
        value.hideProject = true
      } else {
        value.coverUrl = API_ENDPOINT.url + '/static/' + value.creator + '/' + value.projectName + '/' + value.files[0].fileSystemName
      }
    });
  });
}
