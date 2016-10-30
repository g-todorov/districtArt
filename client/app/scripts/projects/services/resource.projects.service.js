'use strict';

angular.module('projects').factory('Projects', ['$resource', 'API_ENDPOINT',
  function($resource, API_ENDPOINT) {
    return $resource(API_ENDPOINT.url + '/projects/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
