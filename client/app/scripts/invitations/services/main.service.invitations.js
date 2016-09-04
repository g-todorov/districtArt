'use strict';

//Products service used to communicate Products REST endpoints
angular.module('invitations').factory('Notifications', ['$resource', '$q', '$http', 'API_ENDPOINT', 'AuthService',
  function($resource, $q, $http, API_ENDPOINT, AuthService) {

    var notificationsResource = $resource(API_ENDPOINT.url + '/invitations/:id', { id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });


    var rejectInvitation = function(notificationId){
      debugger
      return $q(function(resolve, reject) {
        $http.put(API_ENDPOINT.url + '/invitations/' + notificationId + '/reject').then(function(result) {
          resolve(result.data);
        }, function(error){
          reject(error);
        });
      });
    }


    var getNotificationsByUserId = function(){
      return $q(function(resolve, reject) {
        $http.get(API_ENDPOINT.url + '/invitations/getInvitationByReceiver/' + AuthService.getUserId()).then(function(result) {
          resolve(result.data);
        }, function(error){
          reject(error);
        });
      });
    };


    return {
      notificationsResource: notificationsResource,
      getNotificationsByUserId: getNotificationsByUserId,
      rejectInvitation: rejectInvitation
    };
	}
]);
