'use strict';
 
angular.module('Components').controller('HeaderController', ['$scope', 'AuthService', '$state', '$location', '$modal', 'Notifications', 'socket', '_',
  function ($scope, AuthService, $state, $location, $modal, Notifications, socket, _) {

    $scope.notifications = [];
    $scope.newNotifications = [];


    $scope.isAuthenticated = function () {
      return AuthService.isAuthenticated();
    };


    $scope.goToLogin = function () {
      $state.go('login');
    };


    $scope.goToUpload = function () {
      $state.go('upload');
    };


    $scope.logout = function() {
      AuthService.logout();
      $state.go('login');
    };


    $scope.isActive = function(route) {
      return route === $location.path();
    };


    $scope.getUserName = function () {
      return window.localStorage.getItem('USER_NAME');
    };


    $scope.goTopersonalPage = function () {
      $state.go('user-details', {userId: window.localStorage.getItem('USER_ID')});
    };


    $scope.goToCreateStudio = function () {
      $state.go('create-studio');
    };


    // Ensure that socket connection is open
    if(!socket.connected) {
      socket.connect();
    }

    socket.on('invitationsList', function(data) {
      $scope.newNotifications = [];
      $scope.$apply(function () {
        angular.forEach(data, function(value, key) {
          if (value.viewState == 'unread') {
            this.push(value);
          }
        }, $scope.newNotifications);
        $scope.notifications = data
      });
    });


    socket.on('newNotification', function(data){
      $scope.$apply(function () {
        if(data.viewState == 'unread') {
          $scope.newNotifications.push(data);
          $scope.notifications.push(data);
        }
        else if (data.viewState == 'read') {
          var newNotificationIndex = _.findIndex($scope.newNotifications, function(value) {
            return value._id == data._id
          });

          if(newNotificationIndex > -1) {
            $scope.newNotifications.splice(newNotificationIndex, 1);
          }

          var notificationIndex = _.findIndex($scope.notifications, function(value) {
            return value._id == data._id
          });

          if(notificationIndex > -1) {
            $scope.notifications.splice(notificationIndex, 1);
            $scope.notifications.push(data);
          }
        }
      });
    });


    $scope.openNotificationsModal = function() {
      var notificationsModal = $modal({
        templateUrl: 'scripts/components/modal/templates/modal.notifications.template.components.html',
        controller: 'notificationsModalController',
        resolve: {
          getNotifications: function () {
            return $scope.notifications
          }
        }
      });

      notificationsModal.$promise.then(notificationsModal.show);
    };

  }
]);
