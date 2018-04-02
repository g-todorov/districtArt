'use strict';

var connectedUsers = [];

function onDisconnect(socket) {
  require('../sockets/requests.server.sockets').deregister();
  delete connectedUsers[socket.userId];
}

function onConnect(socket) {
  require('../sockets/requests.server.sockets').update(socket, connectedUsers);
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
  require('../sockets/requests.server.sockets').register(socketIo);


  socketIo.on('connection', function (socket) {
    socket.userId = socket.handshake.query.userId;
    connectedUsers[socket.handshake.query.userId] = socket.id;


    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[socket] DISCONNECTED', socket.id);
    });

    onConnect(socket);
    console.info('[socket] CONNECTED', socket.id);
  });
};
