'use strict';

angular.module('requests').factory('Requests', ['$resource', '$q', '$http', 'API_ENDPOINT', 'AuthService',
  function($resource, $q, $http, API_ENDPOINT, AuthService) {
    var requestsResource = $resource(API_ENDPOINT.url + '/requests/:requestId', {requestId: '@_id'}, {
        update: {
          method: 'PUT'
      }
    });


    var getRequestsByUserId = function(){
      return $q(function(resolve, reject) {
        $http.get(API_ENDPOINT.url + '/requests/getRequestByReceiver/' + AuthService.getUserId()).then(function(result) {
          resolve(result.data);
        }, function(error){
          reject(error);
        });
      });
    };


    return {
      requestsResource: requestsResource,
      getRequestsByUserId: getRequestsByUserId
    };
	}
]);
