'use strict';

angular.module('Components').controller('notificationsModalController', ['$scope', '$http', '$q', 'getNotifications', 'studiosService', 'API_ENDPOINT', '_', 'Notifications',
  function($scope, $http, $q, getNotifications, studiosService, API_ENDPOINT, _, Notifications) {

    $scope.notifications = getNotifications
    $scope.studioNamesMap = {}
    $scope.userNamesMap = {}

    $scope.getStudioName = _.memoize(function (studioId) {
      $http.get(API_ENDPOINT.url + '/studios/' + studioId).success(function(result) {
        $scope.studioNamesMap[studioId] = result.studioName
      });
    });

    $scope.getUserName = _.memoize(function (userId) {
      $http.get(API_ENDPOINT.url + '/users/' + userId).success(function(result) {
        $scope.userNamesMap[userId] = result.userName
      });
    });

    $scope.rejectInvitation = function(notificationId) {
      var updatedInvitation = new Notifications.notificationsResource ({
        type: 'invitation'
      });

      Notifications.rejectInvitation(notificationId).then(function(data) {
        $scope.notifications = data;
      }, function(errMsg) {
        console.log(errMsg);
      });

    }

  }
]);
