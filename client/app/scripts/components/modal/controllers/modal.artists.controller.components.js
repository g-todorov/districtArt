'use strict';
 
angular.module('Components').controller('artistsModalController', ['$scope', 'studiosService', 'Artworks', 'usersService','$state', 'API_ENDPOINT', function ($scope, studiosService, Artworks, usersService, $state, API_ENDPOINT) {
    $scope.selectedUsers = [];

    $scope.inviteArtist = function(user, selected, e) {
      if (selected) {
        $scope.selectedUsers.push(user._id);
      } else {
        var index = $scope.selectedUsers.indexOf(user._id);
        $scope.selectedUsers.splice(index, 1)
      }
    }

    $scope.sendInvitations = function() {
      console.log("test");
    }

    $scope.modal = {
      "title": "Select users",
      "users": usersService.query(),
      "sendInvitations": $scope.sendInvitations
    };
  }
]);
