'use strict';

ApplicationConfiguration.registerModule('projects')

angular.module('projects', ['ngFileUpload', 'wu.masonry', 'mgcrea.ngStrap', 'frapontillo.bootstrap-switch'])
  .config(function($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('projects-list', {
        url: '/projects',
        templateUrl: 'scripts/projects/views/list.projects.view.html'
      })
      .state('upload', {
        url: '/projects/upload',
        templateUrl: 'scripts/projects/views/upload.projects.view.html'
      })
      .state('project-details', {
        url: '/projects/:projectId',
        templateUrl: 'scripts/projects/views/details.projects.view.html'
      });

      // Redirect to home view when route not found
      $urlRouterProvider.otherwise('/');
});
