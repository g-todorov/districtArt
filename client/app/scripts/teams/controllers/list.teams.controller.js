'use strict';
 
angular.module('teams').controller('teamsListController', teamsListController);
teamsListController.$inject = ['$scope', 'teamsService', '$state', 'API_ENDPOINT'];

function teamsListController($scope, teamsService, $state, API_ENDPOINT) {
  teamsService.query().$promise.then(function(result) {
    $scope.teams = result
    angular.forEach($scope.teams, function(value, key) {
      if (value.visibility == 'private' && value.owners.indexOf(currentUserId) == -1) {
        value.hideTeam = true
      }
    });
  });
}
