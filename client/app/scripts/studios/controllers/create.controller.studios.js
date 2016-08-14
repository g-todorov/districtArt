angular.module('studios').controller('createStudioController', ['$scope', '$http', 'studiosService', '$state', 'API_ENDPOINT', 'Upload', 'usersService', function ($scope, $http, studiosService, $state, API_ENDPOINT, Upload, usersService) {
  $scope.currentUserId = window.localStorage.getItem('USER_ID');
  $scope.selectedArtworks = [];

  $scope.find = function() {

    $http.get(API_ENDPOINT.url + '/users/getUserArtworksById/' + $scope.currentUserId).then(function(result) {
      $scope.userArtworks = result.data;

      angular.forEach($scope.userArtworks, function(value, key) {
        value.coverUrl = API_ENDPOINT.url + '/' + 'static/' + value.creator + '/' + value.artworkName + '/' + value.fileSystemNames[0]
      });
    });


    usersService.query().$promise.then(function(result) {
      $scope.users = result.filter(function(value) {
        return value._id != $scope.currentUserId
      });
    });


  };

  $scope.selectUser = function(user, selected, e) {

  }

  $scope.selectProject = function(artwork, selected, e) {
    if (selected) {
      $scope.selectedArtworks.push(artwork._id);
    } else {
      var index = $scope.selectedArtworks.indexOf(artwork._id);
      $scope.selectedArtworks.splice(index, 1)
    }
  }


 $scope.createStudio = function() {
   var newStudio = new studiosService ({
     studioName: $scope.studioName,
     studioDescription: $scope.studioDescription,
     creator: $scope.currentUserId,
     admins: [$scope.currentUserId],
     selectedArtworks: $scope.selectedArtworks
   });

   // Redirect after save
   newStudio.$save(function(response) {
     debugger
     $state.go('studios');
      //  // Clear form fields
      //  $scope.name = '';
   }, function(errorResponse) {
     $scope.error = errorResponse.data.message;
   });
 };

}]);
