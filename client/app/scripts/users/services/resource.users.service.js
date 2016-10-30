'use strict';

angular.module('users').factory('usersService', ['$resource', 'API_ENDPOINT',
  function($resource, API_ENDPOINT) {
    return $resource(API_ENDPOINT.url + '/users/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
