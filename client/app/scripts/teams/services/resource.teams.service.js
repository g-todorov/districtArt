'use strict';

angular.module('teams').factory('teamsService', ['$resource', 'API_ENDPOINT',
  function($resource, API_ENDPOINT) {
    return $resource(API_ENDPOINT.url + '/teams/:teamId', {teamId: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
