'use strict';

angular.module('Components').controller('NotificationsModalCtrl', NotificationsModalCtrl);
NotificationsModalCtrl.$inject = ['$scope', '$http', '$q', 'getNotifications', 'studiosService', 'API_ENDPOINT', '_', 'Notifications'];

function NotificationsModalCtrl($scope, $http, $q, getNotifications, studiosService, API_ENDPOINT, _, Notifications) {
  $scope.notifications = getNotifications;
  $scope.studioNamesMap = {};
  $scope.userNamesMap = {};

  $scope.getStudioName = _.memoize(function (domain) {
    var domainUrl = ''
    var domainDataName = ''
    if(domain.type == 'team') {
      domainUrl = 'studios'
      domainDataName = 'studioName'
    }
    else {
      domainUrl = 'artworks'
      domainDataName = 'artworkName'
    }

    $http.get(API_ENDPOINT.url + '/' + domainUrl + '/' + domain.id).then(function(result) {
      $scope.studioNamesMap[domain.id] = result.data[domainDataName];
    });
  });

  $scope.getUserName = _.memoize(function (userId) {
    $http.get(API_ENDPOINT.url + '/users/' + userId).then(function(result) {
      $scope.userNamesMap[userId] = result.data.userName;
    });
  });


  $scope.rejectInvitation = function(notificationId) {
    var updatedInvitation = new Notifications.notificationsResource ({
      viewState: 'read',
      responseState: 'rejected'
    });

    updatedInvitation.$update({invitationId: notificationId}, function() {
      console.log('Successfully updated a notification!');
    }, function(errorResponse) {
      console.log(errorResponse);
    });
  }


  $scope.acceptInvitation = function(notificationId) {
    var updatedInvitation = new Notifications.notificationsResource ({
      viewState: 'read',
      responseState: 'accepted'
    });

    updatedInvitation.$update({invitationId: notificationId}, function(data) {
      var url = ''
      var updatedData = {}

      if(data.domain.type == 'team') {
        url = API_ENDPOINT.url + '/studios/addNewAdmin/' + data.domain.id
        if(data.type == 'invitation') {
          updatedData.newAdminId = data.receiver
        } else if(data.type == 'application') {
          updatedData.newAdminId = data.sender
        }
      } else if (data.domain.type == 'project') {
        url = API_ENDPOINT.url + '/artworks/addNewOwner/' + data.domain.id
        if(data.type == 'invitation') {
          updatedData.newOwnerId = data.receiver
        } else if(data.type == 'application') {
          updatedData.newOwnerId = data.sender
        }
      }

      $http.put(url, updatedData)
      .then(function(result) {
        console.log('Added new user');
      });

      console.log('Successfully updated a notification!');
      }, function(errorResponse) {
        console.log(errorResponse);
    });
  }
}
