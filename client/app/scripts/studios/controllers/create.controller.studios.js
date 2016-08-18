angular.module('studios').controller('createStudioController', ['$scope', '$rootScope', '$http', '$modal', 'studiosService', '$state', 'API_ENDPOINT', 'Upload', 'usersService',
  function ($scope, $rootScope, $http, $modal, studiosService, $state, API_ENDPOINT, Upload, usersService) {

  $scope.currentUserId = window.localStorage.getItem('USER_ID');
  $scope.selectedArtworks = [];


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

   newStudio.$save(function(response) {
      // $state.go('studios');
      //  // Clear form fields
      //  $scope.name = '';
   }, function(errorResponse) {
     $scope.error = errorResponse.data.message;
   });

  };


  $scope.$on('add-studio-artworks', function (event, data) {
    console.log(data)
    $scope.selectedArtworks = data;
  });

  // var artworksModal = $modal.open({
  //   templateUrl: 'scripts/components/modal/templates/modal.artworks.template.components.html',
  //   controller: 'artworksModalController',
  //   size: 'lg',
  //   scope: $scope,
  //   resolve: {
  //     someParam: function () {
  //         return "param"
  //     }
  //   }
  // });

  $scope.showModal = function() {
    var artworksModal = $modal({
      templateUrl: 'scripts/components/modal/templates/modal.artworks.template.components.html',
      controller: 'artworksModalController',
      size: 'lg',
      scope: $scope,
      resolve: {
        preSelectedArtworks: function () {
            return $scope.selectedArtworks
        }
      }
    });

    artworksModal.$promise.then(artworksModal.show);
  };

}]);
