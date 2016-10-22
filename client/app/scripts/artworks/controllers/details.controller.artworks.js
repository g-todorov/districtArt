'use strict';

angular.module('artworks').controller('ProjectDetailsCtrl', ProjectDetailsCtrl);
ProjectDetailsCtrl.$inject = ['$scope', '$rootScope', '$http', 'Artworks', '$state', 'API_ENDPOINT', 'AuthService', 'Notifications', '$modal'];

function ProjectDetailsCtrl($scope, $rootScope, $http, Artworks, $state, API_ENDPOINT, AuthService, Notifications, $modal) {
  var currentUserId = AuthService.getUserId();
  $scope.viewMode = 'read';


  $scope.isAuthenticated = function() {
    return AuthService.isAuthenticated()
  }


  $scope.isAuthorized = function() {
    if ($scope.artwork) {
      return $scope.artwork.owners.indexOf(currentUserId) != -1;
    }
  }

  $rootScope.$on('newNotifications', function(event) {
    hasApplied()
  });


  $scope.saveChanges = function() {
    $http.put(API_ENDPOINT.url + '/artworks/' + $scope.artwork._id, {
      visibility: $scope.artwork.visibility
    })
    .then(function(result) {
      $scope.viewMode = 'read';
    });
  }


  $scope.enterEditMode = function() {
    $scope.viewMode = 'edit';
  }


  Artworks.get({ id: $state.params.artworkId }, function(data) {
    $scope.artwork = data;
    hasApplied()
    // $scope.projectVisibility = data.visibility
    angular.forEach(data.files, function(value, key) {
      value.datailUrl = API_ENDPOINT.url + '/static/' + $scope.artwork.creator + '/' + $scope.artwork.artworkName + '/' + value.fileSystemName;
    });
  });


  function hasApplied() {
    $http.get(API_ENDPOINT.url + '/users/checkIfUserApplied/' + currentUserId, {
      params: {
        domainId: $scope.artwork._id,
        domainType: 'project'
      }
    }).then(function(result) {
      $scope.applied = result.data.applied
    });
  }


  $scope.apply = function() {
    var newInvitation = new Notifications.notificationsResource ({
      type: 'application',
      viewState: 'unread',
      responseState: 'pending',
      domain: {
        id: $scope.artwork._id,
        type: 'project'
      },
      sender: currentUserId,
      receiver: $scope.artwork.creator
    });

    newInvitation.$save(function(){
      hasApplied();
    })
  }


  $scope.showModal = function() {
    var artistsModal = $modal({
      templateUrl: 'scripts/components/modal/templates/modal.artists.template.components.html',
      controller: 'UsersModalCtrl',
      size: 'lg',
      resolve: {
        domainData: function() {
          return {
            owners: $scope.artwork.owners,
            id: $scope.artwork._id,
            type: 'project'
          }
        }
      }
    });

    artistsModal.$promise.then(artistsModal.show);
  };
}
