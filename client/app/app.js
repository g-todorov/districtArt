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

angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// angular.module('artsyApp', [
//     'ngAnimate',
//     'ngCookies',
//     'ngResource',
//     'ngSanitize',
//     'ngTouch',
//     'ui.router',
//     'artworks'
//   ])
  // .run(function($rootScope) {
  //     $rootScope.safeApply = function(fn) {
  //         var phase = $rootScope.$$phase;
  //         if (phase === '$apply' || phase === '$digest') {
  //             if (fn && (typeof(fn) === 'function')) {
  //                 fn();
  //             }
  //         } else {
  //             this.$apply(fn);
  //         }
  //     };
  //
  // });
  // .config(function ($routeProvider) {
  //   $routeProvider
  //     .when('/', {
  //       templateUrl: 'views/main.html',
  //       controller: 'MainCtrl',
  //       controllerAs: 'main'
  //     })
  //     .when('/about', {
  //       templateUrl: 'views/about.html',
  //       controller: 'AboutCtrl',
  //       controllerAs: 'about'
  //     })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  // });
