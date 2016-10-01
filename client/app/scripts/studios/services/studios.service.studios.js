'use strict';

//Products service used to communicate Products REST endpoints
angular.module('studios').factory('studiosService', ['$resource', function($resource) {

    return $resource('http://localhost:3000/studios/:studioId', { studioId: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
