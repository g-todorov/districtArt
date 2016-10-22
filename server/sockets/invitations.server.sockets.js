/**
 * Broadcast updates to client when the model changes
 */

'use strict';

// var invitation = require('../models/invitations.server.model');
var mongoose = require('mongoose');
var Invitation = mongoose.model('Invitation');
var deferred = require('deferred');

var connectedUsers;
var socketIo;

exports.register = function(currSocketIo) {
  if(!socketIo){
    socketIo = currSocketIo
  }
};


exports.update = function(socket, currConnectedUsers) {
  connectedUsers = currConnectedUsers;

  var invitationsByID = Invitation.find({'receiver': { $in: [socket.userId]}}, function(err, docs){
    socket.emit('invitationsList', docs);
  });
};


Invitation.schema.post('save', function (doc) {
  onSave(doc);
});


Invitation.schema.post('remove', function (doc) {
  onRemove(socket, doc);
});


function onSave (doc) {
  socketIo.to(connectedUsers[doc.receiver]).emit('newNotification', doc);
  if(doc.responseState == 'accepted' || doc.responseState == 'rejected') {
    socketIo.to(connectedUsers[doc.sender]).emit('newNotification', doc);
  }
};


function onRemove(socket, doc) {
  socket.emit('removeNotification', doc);
}


exports.deregister = function (socket) {

};
