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
.constant('API_ENDPOINT', {
  url: 'http://localhost:3000'
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
})
.config(function ($locationProvider) {
	$locationProvider.html5Mode(true);
})
.factory('socket', ['$rootScope', 'AuthService', function($rootScope, AuthService) {
  var socket;
  var connected = false;

  var connect = function() {
    if (AuthService.isAuthenticated()) {
      socket = io('http://localhost:3000', {query:'userId=' + AuthService.getUserId()});
      connected = true;
    }
  };

  var on = function(eventName, callback){
    if (socket) {
      socket.on(eventName, callback);
    }
  };

  var emit = function(eventName, data) {
    if (socket) {
      socket.emit(eventName, data);
    }
  };

  connect()

  return {
    connect: connect,
    connected: connected,
    on: on,
    emit: emit
  };

}])
.run(function ($rootScope, $state, AuthService) {
	$rootScope.$on('$stateChangeStart', function (event, next) {
	  if (AuthService.isAuthenticated()) {
			if (next.name == 'login' || next.name == 'register') {
				event.preventDefault();
				$state.go('main');
			}
		}
		else {

		}
	});
});
