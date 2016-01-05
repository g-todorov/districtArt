'use strict';

//Products service used to communicate Products REST endpoints
angular.module('artworks').factory('Artworks', ['$resource', function($resource) {
    // var resource = $$resource('http://localhost:3000/artworks', { id: '@_id'};

    return $resource('http://localhost:3000/artworks', { id: '@_id'}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
