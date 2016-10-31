'use strict';

angular.module('projects').controller('ProjectDetailsCtrl', ProjectDetailsCtrl);
ProjectDetailsCtrl.$inject = ['$scope', '$rootScope', '$http', 'Projects', '$state', 'API_ENDPOINT', 'AuthService', 'Requests', '$modal'];

function ProjectDetailsCtrl($scope, $rootScope, $http, Projects, $state, API_ENDPOINT, AuthService, Requests, $modal) {
  var currentUserId = AuthService.getUserId();
  $scope.viewMode = 'read';


  $scope.isAuthenticated = function() {
    return AuthService.isAuthenticated()
  }


  $scope.isAuthorized = function() {
    if ($scope.project) {
      return $scope.project.owners.indexOf(currentUserId) != -1;
    }
  }


  $rootScope.$on('newRequests', function(event) {
    hasApplied()
  });


  $scope.saveChanges = function() {
    $http.put(API_ENDPOINT.url + '/projects/' + $scope.project._id, {
      visibility: $scope.project.visibility
    })
    .then(function(result) {
      $scope.viewMode = 'read';
    });
  }


  $scope.enterEditMode = function() {
    $scope.viewMode = 'edit';
  }


  Projects.get({ id: $state.params.projectId }, function(data) {
    $scope.project = data;
    hasApplied()
    angular.forEach(data.files, function(value, key) {
      value.datailUrl = API_ENDPOINT.url + '/static/' + $scope.project.creator + '/' + $scope.project.projectName + '/' + value.fileSystemName;
    });
  });


  function hasApplied() {
    $http.get(API_ENDPOINT.url + '/users/checkIfUserApplied/' + currentUserId, {
      params: {
        domainId: $scope.project._id,
        domainType: 'project'
      }
    }).then(function(result) {
      $scope.applied = result.data.applied
    });
  }


  $scope.apply = function() {
    var newRequest = new Requests.requestsResource ({
      type: 'application',
      viewState: 'unread',
      responseState: 'pending',
      domain: {
        id: $scope.project._id,
        type: 'project'
      },
      sender: currentUserId,
      receiver: $scope.project.creator
    });

    newRequest.$save(function(){
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
            owners: $scope.project.owners,
            id: $scope.project._id,
            type: 'project'
          }
        }
      }
    });
    usersModal.$promise.then(usersModal.show);
  };
}
