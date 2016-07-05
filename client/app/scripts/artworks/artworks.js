'use strict';

//register artwroks module
ApplicationConfiguration.registerModule('artworks')

// Setting up route
angular.module('artworks', ['angularFileUpload']).config(function($urlRouterProvider, $stateProvider) {
  // Artworks state routing
  $stateProvider
    .state('artworks', {
      url: '/artworks',
      templateUrl: 'scripts/artworks/views/main.view.artworks.html'
    })
    .state('upload', {
      url: '/artworks/upload',
      templateUrl: 'scripts/artworks/views/upload.view.artworks.html'
    })
    .state('details', {
      url: '/artworks/:artworkId',
      templateUrl: 'scripts/artworks/views/details.view.artworks.html'
    });

    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

});
