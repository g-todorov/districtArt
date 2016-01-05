'use strict';

//register artwroks module
ApplicationConfiguration.registerModule('artworks')

// Setting up route
angular.module('artworks').config(function($urlRouterProvider,  $stateProvider) {
  // Redirect to home view when route not found
  $urlRouterProvider.otherwise('/');

  // Artworks state routing
  $stateProvider.
  state('artworks', {
    url: '/artworks',
    templateUrl: 'scripts/artworks/views/main.view.artworks.html'
  });

});
