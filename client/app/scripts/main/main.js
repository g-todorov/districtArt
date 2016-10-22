'use strict';

ApplicationConfiguration.registerModule('Main');

angular.module('Main').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'scripts/main/views/layout.view.main.html',
    });

  $urlRouterProvider.otherwise('/');
})
