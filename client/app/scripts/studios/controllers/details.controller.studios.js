'use strict';
 
angular.module('studios').controller('studioDetailsController', ['$scope', 'studiosService', 'Artworks', '$modal', 'usersService','$state', 'API_ENDPOINT', 'AuthService',
  function ($scope, studiosService, Artworks, $modal, usersService, $state, API_ENDPOINT, AuthService) {

    $scope.isAuthenticated = function () {
      return AuthService.isAuthenticated();
    };


    $scope.currentUserId = window.localStorage.getItem('USER_ID');
    $scope.studioArtworks = []

    studiosService.get({ id: $state.params.studioId }, function(data) {
      $scope.studio = data;

      angular.forEach(data.artworks, function(value, key){
        var self = this
        Artworks.get({ id: value }, function(data) {
          data.coverUrl = API_ENDPOINT.url + '/' + 'static/' + data.creator + '/' + data.artworkName + '/' + data.fileSystemNames[0]
          self.push(data);
        });
      }, $scope.studioArtworks);
    });


    $scope.showModal = function() {

      var artistsModal = $modal({
        templateUrl: 'scripts/components/modal/templates/modal.artists.template.components.html',
        controller: 'artistsModalController',
        size: 'lg',
        resolve: {
          getStudioId: function() {
            return $state.params.studioId
          }
        }
      });

      artistsModal.$promise.then(artistsModal.show);
    };

    $scope.isAuthorized = function () {
      // if($scope.studio.creator == $scope.currentUserId) {
      //   return true
      // } else {
      //   return false
      // }
      return true
    }

    // $scope.modal = {
    //   "title": "Select users",
    //   "users": usersService.query()
    // };

  }
]);
