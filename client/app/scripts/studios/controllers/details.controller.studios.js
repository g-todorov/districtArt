'use strict';
 
angular.module('studios').controller('studioDetailsController', ['$scope', 'studiosService', 'Artworks', '$modal', 'usersService','$state', 'API_ENDPOINT', 'AuthService',
  function ($scope, studiosService, Artworks, $modal, usersService, $state, API_ENDPOINT, AuthService) {

    var currentUserId = AuthService.getUserId();
    $scope.studioArtworks = [];

    $scope.isAuthorized = function () {
      if ($scope.studio) {
        return AuthService.isAuthenticated() && $scope.studio.admins.indexOf(currentUserId) > -1
      }
    };


    studiosService.get({ studioId: $state.params.studioId }, function(data) {
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
          studioData: function() {
            return $scope.studio
          }
        }
      });

      artistsModal.$promise.then(artistsModal.show);
    };


  }
]);
