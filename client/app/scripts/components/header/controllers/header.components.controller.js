'use strict';
 
angular.module('Components').controller('HeaderCtrl', HeaderCtrl);
HeaderCtrl.$inject = ['$scope', '$rootScope', '$window', 'AuthService', '$state', '$location', '$modal', 'Requests', 'socket', '_'];

function HeaderCtrl($scope, $rootScope, $window, AuthService, $state, $location, $modal, Requests, socket, _) {
  $scope.requests = [];
  $scope.newRequests = [];


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
    socket.disconnect();
    // $window.location.reload();
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


  $scope.goToCreateTeam = function () {
    $state.go('create-team');
  };


  // Ensure that socket connection is open
  if(!socket.connected) {
    socket.connect();
  }

  socket.on('requestsList', function(data) {
    $scope.newRequests = [];
    $rootScope.$apply(function () {
      angular.forEach(data, function(value, key) {
        if (value.viewState == 'unread') {
          this.push(value);
        }
      }, $scope.newRequests);
      $scope.requests = data
    });
  });


  socket.on('newRequest', function(data){
    $scope.$apply(function () {
      $rootScope.$emit('newRequests');
      if(data.viewState == 'unread') {
        $scope.newRequests.push(data);
        $scope.requests.push(data);
      }
      else if (data.viewState == 'read') {
        var newRequestIndex = _.findIndex($scope.newRequests, function(value) {
          return value._id == data._id
        });

        if(newRequestIndex > -1) {
          $scope.newRequests.splice(newRequestIndex, 1);
        }

        var requestIndex = _.findIndex($scope.requests, function(value) {
          return value._id == data._id
        });

        if(requestIndex > -1) {
          $scope.requests.splice(requestIndex, 1);
          $scope.requests.push(data);
        }
      }
    });
  });


  $scope.openRequestsModal = function() {
    var requestsModal = $modal({
      templateUrl: 'scripts/components/modal/templates/modal.requests.components.template.html',
      controller: 'RequestsModalCtrl',
      resolve: {
        getRequests: function () {
          return $scope.requests
        }
      }
    });
    requestsModal.$promise.then(requestsModal.show);
  };
}
