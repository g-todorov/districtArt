'use strict';
 
angular.module('studios').controller('studioDetailsController', ['$scope', 'studiosService', 'Artworks', 'usersService','$state', 'API_ENDPOINT', function ($scope, studiosService, Artworks, usersService, $state, API_ENDPOINT) {
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


    // usersService.query(function(data){
    //   $scope.users = data
    // });


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
