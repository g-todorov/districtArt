'use strict';

angular.module('teams').controller('CreateTeamCtrl', CreateTeamCtrl);
CreateTeamCtrl.$inject = ['$scope', '$rootScope', '$http', '$modal', 'teamsService', '$state', 'API_ENDPOINT', 'Upload', 'usersService', 'AuthService'];

function CreateTeamCtrl($scope, $rootScope, $http, $modal, teamsService, $state, API_ENDPOINT, Upload, usersService, AuthService) {
  $scope.currentUserId = AuthService.getUserId();
  $scope.selectedProjects = [];
  $scope.visibility = 'public'


  $http.get(API_ENDPOINT.url + '/projects/getProjectsByUserId/', {params: {userId: $scope.currentUserId}}).then(function(result) {
    $scope.userProjects = result.data;

    angular.forEach($scope.userProjects, function(value, key) {
      value.coverUrl = API_ENDPOINT.url + '/static/' + value.creator + '/' + value.projectName + '/' + value.files[0].fileSystemName
    });
  });


  usersService.query().$promise.then(function(result) {
    $scope.users = result.filter(function(value) {
      return value._id != $scope.currentUserId
    });
  });


  $scope.selectProject = function(project, selected, e) {
    if (selected) {
      $scope.selectedProjects.push(project._id);
    } else {
      var index = $scope.selectedProjects.indexOf(project._id);
      $scope.selectedProjects.splice(index, 1)
    }
  }


  $scope.createTeam = function() {
    var newTeam = new teamsService ({
     teamName: $scope.teamName,
     teamDescription: $scope.teamDescription,
     creator: $scope.currentUserId,
     admins: [$scope.currentUserId],
     selectedProjects: $scope.selectedProjects,
     visibility: $scope.visibility
   });

   newTeam.$save(function(response) {
      $state.go('team-details', {teamId: response._id});
   }, function(errorResponse) {
     $scope.error = errorResponse.data.message;
   });

  };


  $scope.$on('add-team-projects', function (event, data) {
    console.log(data)
    $scope.selectedProjects = data;
  });


  $scope.showModal = function() {
    var projectsModal = $modal({
      templateUrl: 'scripts/components/modal/templates/modal.projects.components.template.html',
      controller: 'ProjectsModalCtrl',
      size: 'lg',
      scope: $scope,
      resolve: {
        preSelectedProjects: function () {
          return $scope.selectedProjects
        }
      }
    });

    projectsModal.$promise.then(projectsModal.show);
  };
};
