'use strict';

var mongoose = require('mongoose');
var Request = mongoose.model('Request');

var connectedUsers;
var socketIo;

exports.register = function(currSocketIo) {
  if(!socketIo){
    socketIo = currSocketIo
  }
};


exports.update = function(socket, currConnectedUsers) {
  connectedUsers = currConnectedUsers;

  var requestsByID = Request.find({'receiver': { $in: [socket.userId]}}, function(err, docs){
    socket.emit('requestsList', docs);
  });
};


Request.schema.post('save', function (doc) {
  onSave(doc);
});


Request.schema.post('remove', function (doc) {
  onRemove(socket, doc);
});


function onSave (doc) {
  socketIo.to(connectedUsers[doc.receiver]).emit('newRequest', doc);
  if(doc.responseState == 'accepted' || doc.responseState == 'rejected') {
    socketIo.to(connectedUsers[doc.sender]).emit('newRequest', doc);
  }
};


function onRemove(socket, doc) {
  socket.emit('removeRequest', doc);
}


exports.deregister = function (socket) {

};
