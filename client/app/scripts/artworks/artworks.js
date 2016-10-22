'use strict';

ApplicationConfiguration.registerModule('artworks')

// Setting up route
angular.module('artworks', ['ngFileUpload', 'wu.masonry', 'frapontillo.bootstrap-switch']).config(function($urlRouterProvider, $stateProvider) {
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
angular.module('artworks', ['ngFileUpload', 'wu.masonry', 'mgcrea.ngStrap', 'frapontillo.bootstrap-switch'])
  .config(function($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('artworks', {
        url: '/artworks',
        templateUrl: 'scripts/artworks/views/main.view.artworks.html'
      })
      .state('upload', {
        url: '/artworks/upload',
        templateUrl: 'scripts/artworks/views/upload.view.artworks.html'
      })
      .state('artwork-details', {
        url: '/artworks/:artworkId',
        templateUrl: 'scripts/artworks/views/details.view.artworks.html'
      });

      // Redirect to home view when route not found
      $urlRouterProvider.otherwise('/');
});
