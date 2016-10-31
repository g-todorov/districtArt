'use strict';
 
angular.module('teams').controller('TeamDetailsCtrl', TeamDetailsCtrl)
TeamDetailsCtrl.$inject = ['$scope', '$rootScope', '$http', '$state', 'teamsService', 'Projects', 'Requests', '$modal', 'usersService', 'API_ENDPOINT', 'AuthService']

function TeamDetailsCtrl($scope, $rootScope, $http, $state, teamsService, Projects, Requests, $modal, usersService, API_ENDPOINT, AuthService) {
  var currentUserId = AuthService.getUserId();
  $scope.viewMode = 'read';
  $scope.teamProjects = [];

  $scope.isAuthenticated = function() {
    return AuthService.isAuthenticated()
  }


  $scope.isAuthorized = function() {
    if ($scope.team) {
      return $scope.team.admins.indexOf(currentUserId) > -1
    }
  };


  $rootScope.$on('newRequests', function(event) {
    hasApplied()
  });


  teamsService.get({ teamId: $state.params.teamId }, function(data) {
    $scope.team = data;
    hasApplied()
    angular.forEach(data.projects, function(value, key){
      var self = this
      Projects.get({ id: value }, function(data) {
        if (value.visibility == 'private' && value.owners.indexOf(currentUserId) == -1) {
          value.hideProject = true
        }
        data.coverUrl = API_ENDPOINT.url + '/' + 'static/' + data.creator + '/' + data.projectName + '/' + data.files[0].fileSystemName
        self.push(data);
      });
    }, $scope.teamProjects);
  });


  function hasApplied() {
    $http.get(API_ENDPOINT.url + '/users/checkIfUserApplied/' + currentUserId, {
      params: {
        domainId: $scope.team._id,
        domainType: 'team'
      }
    })
    .then(function(result) {
      $scope.applied = result.data.applied
    });
  }


  $scope.apply = function() {
    var newRequest = new Requests.requestsResource ({
      type: 'application',
      viewState: 'unread',
      responseState: 'pending',
      domain: {
        id: $scope.team._id,
        type: 'team'
      },
      sender: currentUserId,
      receiver: $scope.team.creator
    });

    newRequest.$save(function(err, result){
      $scope.applied = 'true'
      hasApplied();
    })
  }


  $scope.showModal = function() {
    var usersModal = $modal({
      templateUrl: 'scripts/components/modal/templates/modal.users.components.template.html',
      controller: 'UsersModalCtrl',
      size: 'lg',
      resolve: {
        domainData: function() {
          return {
            owners: $scope.team.admins,
            id: $scope.team._id,
            type: 'team'
          }
        }
      }
    });
    usersModal.$promise.then(usersModal.show);
  };
}
