'use strict';
 
angular.module('Components').controller('UsersModalCtrl', UsersModalCtrl);
UsersModalCtrl.$inject = ['$scope', '$http', '$modal', 'Notifications', 'usersService', '$state', 'API_ENDPOINT', 'studioData', 'AuthService'];

function UsersModalCtrl($scope, $http, $modal, Notifications, usersService, $state, API_ENDPOINT, studioData, AuthService) {
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


  usersService.query().$promise.then(function(result) {
    angular.forEach(result, function(value){
      var self = this
      if (value._id != $scope.currentUserId && studioData.admins.indexOf(value._id) == -1) {
        $http.get(API_ENDPOINT.url + '/users/checkIfUserIsInvited/' + value._id, {params: {studioId: studioData._id}}).then(function(result) {
          if (result.data.invited == false) {
            self.push(value);
          }
        });
      }
    }, $scope.users);
  });


  $scope.sendInvitations = function() {
    angular.forEach($scope.selectedUsers, function(value, key) {
      var newInvitation = new Notifications.notificationsResource ({
        type: 'invitation',
        viewState: 'unread',
        responseState: 'pending',
        studio: studioData._id,
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
