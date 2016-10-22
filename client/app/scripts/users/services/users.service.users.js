'use strict';

angular.module('users').factory('usersService', ['$resource', function($resource) {
    return $resource('http://localhost:3000/users/:id', { id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
