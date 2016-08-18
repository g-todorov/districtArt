'use strict';
 
angular.module('Components').controller('artistsModalController', ['$scope', 'socket', '$modal', 'studiosService', 'Invitations', 'usersService', '$state', 'API_ENDPOINT', function ($scope, socket, $modal, studiosService, Invitations, usersService, $state, API_ENDPOINT) {
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
      var newInvitation = new Invitations ({
        type: 'invitation',
        status: 'unread',
        sendFrom: [$scope.currentUserId],
        sendTo: $scope.selectedUsers
      });


      newInvitation.$save(function(response) {
        $state.go('studios');
         //  // Clear form fields
         //  $scope.name = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

  }
]);
