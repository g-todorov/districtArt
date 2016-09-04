'use strict';
 
angular.module('Components').controller('HeaderController', ['$scope', 'AuthService', '$state', '$location', '$modal', 'Notifications', 'socket',
  function ($scope, AuthService, $state, $location, $modal, Notifications, socket) {

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
      $state.go('personal-page', {userId: window.localStorage.getItem('USER_ID')});
    };


    $scope.goToCreateStudio = function () {
      $state.go('create-studio');
    };


    //TODO move this to another controller
    if(AuthService.isAuthenticated() == true) {
      Notifications.getNotificationsByUserId().then(function(data) {
        $scope.notifications = data;
      }, function(errMsg) {
        console.log(errMsg);
      });
    }


    socket.on('newNotification', function(data) {
      $scope.$apply(function () {
        console.log(data)
        // $scope.newCustomers.push(data.customer);
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
