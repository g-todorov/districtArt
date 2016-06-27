'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'artsyApp';
	var applicationModuleVendorDependencies = ['ngAnimate', 'ngCookies',  'ngResource',  'ngTouch',  'ngSanitize',  'ui.router', 'ngTouch'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies)
// .constant('AUTH_EVENTS', {
//   notAuthenticated: 'auth-not-authenticated'
// })

.constant('API_ENDPOINT', {
  url: 'http://localhost:3000'
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
})
.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

		$locationProvider.html5Mode(true);
		//$httpProvider.interceptors.push('authInterceptor');
	})

// .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
// 	return {
// 		// Add authorization token to headers
// 		request: function (config) {
// 			debugger
// 			config.headers = config.headers || {};
// 			if ($cookieStore.get('token')) {
// 				config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
// 			}
// 			return config;
// 		},
//
// 		// Intercept 401s and redirect you to login
// 		responseError: function(response) {
// 			if(response.status === 401) {
// 				$location.path('/login');
// 				// remove any stale tokens
// 				$cookieStore.remove('token');
// 				return $q.reject(response);
// 			}
// 			else {
// 				return $q.reject(response);
// 			}
// 		}
// 	};
// })

.run(function ($rootScope, $state, AuthService) {
	// $rootScope.$on('$stateChangeStart', function (event, next) {
  //   if (!AuthService.isAuthenticated()) {
  //     console.log(next.name);
  //     if (next.name !== 'login' && next.name !== 'register') {
  //       event.preventDefault();
  //       $state.go('login');
  //     }
  //   } else {
	// 		if (next.name == 'login' || next.name == 'register') {
	// 			event.preventDefault();
	// 			$state.go('main');
	// 		}
	// 	}
  // });
	$rootScope.$on('$stateChangeStart', function (event, next) {
	  if (AuthService.isAuthenticated()) {
			if (next.name == 'login' || next.name == 'register') {
				event.preventDefault();
				$state.go('main');
			}
		}
	});
});