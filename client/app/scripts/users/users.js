'use strict';

//register users module
ApplicationConfiguration.registerModule('users');

// Setting up route
angular.module('users').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'scripts/users/views/login.html',
      controller: 'login'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'scripts/users/views/register.html',
      controller: 'login'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'scripts/users/views/list.view.users.html',
    })
   .state('personal-page', {
      url: '/users/:userId',
      templateUrl: 'scripts/users/views/personal.page.view.users.html'
    });
})
