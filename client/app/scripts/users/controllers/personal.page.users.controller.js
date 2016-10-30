'use strict';
 
angular.module('users').controller('PersonalPageController', PersonalPageController);
PersonalPageController.$inject = ['$scope', '$state', '$http', 'usersService', 'AuthService', 'API_ENDPOINT'];

function PersonalPageController($scope, $state, $http, usersService, AuthService, API_ENDPOINT) {
  var userProfileId = $state.params.userId;

  usersService.get({id: userProfileId}, function(data) {
    $scope.userDetails = data;
    $scope.date = data.created
  });


  $http.get(API_ENDPOINT.url + '/projects/getProjectsByUserId/', {params: {userId: userProfileId}}).then(function(result) {
    $scope.userProjects = result.data;
    angular.forEach($scope.userProjects, function(value, key) {
      if (value.visibility == 'private' && value.owners.indexOf(userProfileId) == -1) {
        value.hideProject = true
      }
      else {
        value.coverUrl = API_ENDPOINT.url + '/' + 'static/' + value.creator + '/' + value.projectName + '/' + value.files[0].fileSystemName
      }
    });
  });
}
