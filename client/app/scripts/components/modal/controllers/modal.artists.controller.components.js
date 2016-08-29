'use strict';
 
angular.module('Components').controller('artistsModalController', ['$scope', 'socket', '$modal', 'studiosService', 'Notifications', 'usersService', '$state', 'API_ENDPOINT', 'getStudioId',
  function ($scope, socket, $modal, studiosService, Notifications, usersService, $state, API_ENDPOINT, getStudioId) {

    $scope.currentUserId = window.localStorage.getItem('USER_ID');
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


    usersService.query().$promise.then(function(result) {
      $scope.users = result.filter(function(value) {
        return value._id != $scope.currentUserId
      });
    });


    $scope.sendInvitations = function() {

      angular.forEach($scope.selectedUsers, function(value, key) {
        var newInvitation = new Notifications.notificationsResource ({
          type: 'invitation',
          viewState: 'unread',
          responseState: 'pending',
          studio: getStudioId,
          sender: $scope.currentUserId,
          receiver: value
        });

        newInvitation.$save(function(response) {
           // $state.go('studios');
           //  // Clear form fields
           //  $scope.name = '';
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      });

    };

  }
]);
