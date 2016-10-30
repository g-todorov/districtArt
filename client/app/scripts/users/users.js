'use strict';

//register users module
ApplicationConfiguration.registerModule('users');

// Setting up route
angular.module('users', ['ui.identicon', 'wu.masonry']).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'scripts/users/views/login.users.view.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'scripts/users/views/register.users.view.html'
    })
    .state('users-list', {
      url: '/users',
      templateUrl: 'scripts/users/views/list.users.view.html',
    })
   .state('user-details', {
      url: '/users/:userId',
      templateUrl: 'scripts/users/views/personal.page.users.view.html'
    });
})
