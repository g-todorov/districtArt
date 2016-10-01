/**
 * Socket.io configuration
 */

'use strict';

// var config = require('./environment');
var connectedUsers = [];
// var registeredInvitations = false;

// When the user disconnects.. perform this
function onDisconnect(socket) {
  // var index = connectedUsers[socket.userId];
  // connectedUsers.splice(index, 1);
  require('../sockets/invitations.server.sockets').deregister();
  // socket.removeAllListeners('connection');
  delete connectedUsers[socket.userId]; // remove the client from the array
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  //socket.emit('info', socket.id);
  // Insert sockets below
  // if (!registeredInvitations) {
    require('../sockets/invitations.server.sockets').update(socket, connectedUsers);
  //   registeredInvitations = true;
  // }
}

module.exports = function (socketIo) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));
  require('../sockets/invitations.server.sockets').register(socketIo);


  socketIo.on('connection', function (socket) {
    // socket.address = socket.handshake.address !== null ?
    //         socket.handshake.address.address + ':' + socket.handshake.address.port :
    //         process.env.DOMAIN;
    //
    // socket.connectedAt = new Date();
    socket.userId = socket.handshake.query.userId
    connectedUsers[socket.handshake.query.userId] = socket.id


    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address, socket.id);
  });
};
