'use strict';

angular.module('Components').controller('notificationsModalController', ['$scope', '$http', '$q', 'getNotifications', 'studiosService', 'API_ENDPOINT', '_', 'Notifications',
  function($scope, $http, $q, getNotifications, studiosService, API_ENDPOINT, _, Notifications) {

    $scope.notifications = getNotifications;
    $scope.studioNamesMap = {};
    $scope.userNamesMap = {};

    $scope.getStudioName = _.memoize(function (studioId) {
      $http.get(API_ENDPOINT.url + '/studios/' + studioId).then(function(result) {
        $scope.studioNamesMap[studioId] = result.data.studioName;
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
        $http.put(API_ENDPOINT.url + '/studios/addNewAdmin/' + data.studio, {newAdminId: data.receiver}).then(function(result) {
          console.log('Added new user');
          //$scope.studioNamesMap[studioId] = result.studioName
        });
        console.log('Successfully updated a notification!');
        }, function(errorResponse) {
          console.log(errorResponse);
      });
    }

  }
]);
