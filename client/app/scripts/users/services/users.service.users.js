'use strict';

//Products service used to communicate Products REST endpoints
angular.module('users').factory('usersService', ['$resource', function($resource) {
    // var resource = $$resource('http://localhost:3000/artworks', { id: '@_id'};

    return $resource('http://localhost:3000/users/:id', { id: '@_id'}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
