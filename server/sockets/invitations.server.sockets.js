/**
 * Broadcast updates to client when the model changes
 */

'use strict';

// var invitation = require('../models/invitations.server.model');
var mongoose = require('mongoose');
var Invitation = mongoose.model('Invitation');

exports.register = function(socket) {
  Invitation.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Invitation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc) {
  // console.log(doc)
  socket.emit('newNotification', doc);
}

function onRemove(socket, doc) {
  socket.emit('thing:remove', doc);
}
