'use strict';

//register users module
ApplicationConfiguration.registerModule('users');

// Setting up route
angular.module('users', ['ui.identicon', 'wu.masonry']).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'scripts/users/views/login.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'scripts/users/views/register.html'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'scripts/users/views/list.view.users.html',
    })
   .state('user-details', {
      url: '/users/:userId',
      templateUrl: 'scripts/users/views/personal.page.view.users.html'
    });
})
