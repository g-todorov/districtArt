'use strict';
 
angular.module('Components').controller('UsersModalCtrl', UsersModalCtrl);
UsersModalCtrl.$inject = ['$scope', '$http', '$modal', 'Notifications', 'usersService', '$state', 'API_ENDPOINT', 'domainData', 'AuthService'];

function UsersModalCtrl($scope, $http, $modal, Notifications, usersService, $state, API_ENDPOINT, domainData, AuthService) {
  $scope.currentUserId = AuthService.getUserId();
  $scope.selectedUsers = [];
  $scope.users = []
  $scope.title = 'Select artists'

  $scope.inviteArtist = function(user, selected, e) {
    if (selected) {
      $scope.selectedUsers.push(user._id);
    } else {
      var index = $scope.selectedUsers.indexOf(user._id);
      $scope.selectedUsers.splice(index, 1)
    }
  };


  $http.get(API_ENDPOINT.url + '/users/getNotRequestedUsers/' + $scope.currentUserId, {
    params: {
      domainId: domainData.id,
      domainType: domainData.type
    }
  })
  .then(function(result) {
    $scope.users = result.data;
  });


  $scope.sendInvitations = function() {
    angular.forEach($scope.selectedUsers, function(value, key) {
      var newInvitation = new Notifications.notificationsResource ({
        type: 'invitation',
        viewState: 'unread',
        responseState: 'pending',
        domain: {
          id: domainData.id,
          type: domainData.type
        },
        sender: $scope.currentUserId,
        receiver: value
      });

      newInvitation.$save();
    });
  };
}
