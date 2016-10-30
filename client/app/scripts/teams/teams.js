'use strict';

ApplicationConfiguration.registerModule('teams');

angular.module('teams', ['ngFileUpload', 'mgcrea.ngStrap']).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('teams-list', {
      url: '/teams',
      templateUrl: 'scripts/teams/views/list.teams.view.html'
    })
    .state('create-team', {
      url: '/teams/create',
      templateUrl: 'scripts/teams/views/create.teams.view.html'
    })
    .state('team-details', {
      url: '/teams/:teamId',
      templateUrl: 'scripts/teams/views/details.teams.view.html'
    });
})
