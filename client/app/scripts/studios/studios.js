'use strict';

//register users module
ApplicationConfiguration.registerModule('studios');

// Setting up route
angular.module('studios', ['ngFileUpload', 'mgcrea.ngStrap']).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('studios', {
      url: '/studios',
      templateUrl: 'scripts/studios/views/main.view.studios.html'
    })
    .state('create-studio', {
      url: '/studios/create',
      templateUrl: 'scripts/studios/views/create.view.studios.html'
    })
    .state('studio-details', {
      url: '/studios/:studioId',
      templateUrl: 'scripts/studios/views/details.view.studios.html'
    });
})
