'use strict';

angular.module('Components').controller('RequestsModalCtrl', RequestsModalCtrl);
RequestsModalCtrl.$inject = ['$scope', '$http', '$q', 'getRequests', 'teamsService', 'API_ENDPOINT', '_', 'Requests'];

function RequestsModalCtrl($scope, $http, $q, getRequests, teamsService, API_ENDPOINT, _, Requests) {
  $scope.requests = getRequests;
  $scope.teamNamesMap = {};
  $scope.userNamesMap = {};

  $scope.getTeamName = _.memoize(function (domain) {
    var domainUrl = ''
    var domainDataName = ''
    if(domain.type == 'team') {
      domainUrl = 'teams'
      domainDataName = 'teamName'
    }
    else {
      domainUrl = 'projects'
      domainDataName = 'projectName'
    }

    $http.get(API_ENDPOINT.url + '/' + domainUrl + '/' + domain.id).then(function(result) {
      $scope.teamNamesMap[domain.id] = result.data[domainDataName];
    });
  });

  $scope.getUserName = _.memoize(function (userId) {
    $http.get(API_ENDPOINT.url + '/users/' + userId).then(function(result) {
      $scope.userNamesMap[userId] = result.data.userName;
    });
  });


  $scope.rejectRequest = function(requestId) {
    var updatedRequest = new Requests.requestsResource ({
      viewState: 'read',
      responseState: 'rejected'
    });

    updatedRequest.$update({requestId: requestId}, function() {
      console.log('Successfully updated a requests!');
    }, function(errorResponse) {
      console.log(errorResponse);
    });
  }


  $scope.acceptRequest = function(requestId) {
    var updatedRequest = new Requests.requestsResource ({
      viewState: 'read',
      responseState: 'accepted'
    });

    updatedRequest.$update({requestId: requestId}, function(data) {
      var url = ''
      var updatedData = {}
      if(data.domain.type == 'team') {
        url = API_ENDPOINT.url + '/teams/addNewAdmin/' + data.domain.id
        if(data.type == 'invitation') {
          updatedData.newAdminId = data.receiver
        } else if(data.type == 'application') {
          updatedData.newAdminId = data.sender
        }
      } else if (data.domain.type == 'project') {
        url = API_ENDPOINT.url + '/projects/addNewOwner/' + data.domain.id
        if(data.type == 'invitation') {
          updatedData.newOwnerId = data.receiver
        } else if(data.type == 'application') {
          updatedData.newOwnerId = data.sender
        }
      }

      $http.put(url, updatedData)
      .then(function(result) {
        console.log('Added new user');
      });

      console.log('Successfully updated a requests!');
      }, function(errorResponse) {
        console.log(errorResponse);
    });
  }
}
