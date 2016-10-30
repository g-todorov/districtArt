'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'districtArt';
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
})
.config(function ($locationProvider) {
	$locationProvider.html5Mode(true);
})
.factory('socket', ['AuthService', function(AuthService) {
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

  var disconnect = function() {
    if(socket) {
      socket.disconnect()
      connected = false
    }
  }

  connect()

  return {
    connect: connect,
    connected: connected,
    on: on,
    emit: emit,
    disconnect: disconnect
  };
}])
.run(function ($rootScope, $state, AuthService) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    if (AuthService.isAuthenticated()) {
      if (next.name == 'login' || next.name == 'register' || next.name == 'main') {
        event.preventDefault();
        $state.go('projects-list');
      }
    }
  });
});
