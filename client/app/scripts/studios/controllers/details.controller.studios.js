'use strict';
 
angular.module('studios').controller('StudioDetailsCtrl', StudioDetailsCtrl)
StudioDetailsCtrl.$inject = ['$scope', '$rootScope', '$http', '$state', 'studiosService', 'Artworks', 'Notifications', '$modal', 'usersService', 'API_ENDPOINT', 'AuthService']

function StudioDetailsCtrl($scope, $rootScope, $http, $state, studiosService, Artworks, Notifications, $modal, usersService, API_ENDPOINT, AuthService) {
  var currentUserId = AuthService.getUserId();
  $scope.studioArtworks = [];

  $scope.isAuthenticated = function() {
    return AuthService.isAuthenticated()
  }


  $scope.isAuthorized = function() {
    if ($scope.studio) {
      return $scope.studio.admins.indexOf(currentUserId) > -1
    }
  };


  $rootScope.$on('newNotifications', function(event) {
    hasApplied()
  });


  studiosService.get({ studioId: $state.params.studioId }, function(data) {
    $scope.studio = data;
    hasApplied()
    angular.forEach(data.artworks, function(value, key){
      var self = this
      Artworks.get({ id: value }, function(data) {
        data.coverUrl = API_ENDPOINT.url + '/' + 'static/' + data.creator + '/' + data.artworkName + '/' + data.files[0].fileSystemName
        self.push(data);
      });
    }, $scope.studioArtworks);
  });


  function hasApplied() {
    $http.get(API_ENDPOINT.url + '/users/checkIfUserApplied/' + currentUserId, {
      params: {
        domainId: $scope.studio._id,
        domainType: 'team'
      }
    })
    .then(function(result) {
      $scope.applied = result.data.applied
    });
  }


  $scope.apply = function() {
    var newInvitation = new Notifications.notificationsResource ({
      type: 'application',
      viewState: 'unread',
      responseState: 'pending',
      domain: {
        id: $scope.studio._id,
        type: 'team'
      },
      sender: currentUserId,
      receiver: $scope.studio.creator
    });

    newInvitation.$save(function(err, result){
      $scope.applied = 'true'
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
            owners: $scope.studio.admins,
            id: $scope.studio._id,
            type: 'team'
          }
        }
      }
    });
    artistsModal.$promise.then(artistsModal.show);
  };
}
