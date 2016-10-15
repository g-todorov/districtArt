angular.module('users').service('AuthService', function($q, $http, API_ENDPOINT) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var isAuthenticated = false;
  var userId = '';
  var userName = '';
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }


  function loadUserData() {
    var userId = window.localStorage.getItem('USER_ID');
    var userName = window.localStorage.getItem('USER_NAME');
    if(userId && userName) {
      userData(userId, userName)
    }
  }


  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }


  function storeUserData(userId, userName) {
    window.localStorage.setItem('USER_ID', userId);
    window.localStorage.setItem('USER_NAME', userName);
    userData(userId, userName);
  }


  function userData(id, name) {
    userId = id
    userName = name
  }


  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }


  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }


  var register = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/users/register', user).then(function(result) {
        if (result.data.success) {
          login(user);
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };


  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/users/authenticate', user).then(function(result) {
        if (result.data.success) {
          storeUserCredentials(result.data.token);
          storeUserData(result.data.user._id, result.data.user.userName);
          // socket.connect(result.data.user._id)
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };


  var logout = function() {
    destroyUserCredentials();
  };


  loadUserCredentials();
  loadUserData();


  return {
    login: login,
    register: register,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
    getUserId: function() {return userId;},
    getUserName: function() {return userName}
  };
})
