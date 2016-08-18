'use strict';

//Products service used to communicate Products REST endpoints
angular.module('invitations').factory('Invitations', ['$resource', function($resource) {

    return $resource('http://localhost:3000/invitations/:id', { id: '@_id'}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
