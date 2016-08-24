// Module dependencies.
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
var passport	= require('passport');
var cors = require('cors');
var path = require('path');

// Create the application.
var app = express();
var http = require('http');

var server = http.createServer(app);
var io = require('socket.io').listen(server);


//config SocketIo
require('./config/socketio')(io);


// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//CORS Support
app.use(cors());


// Config mongodb
var dbConfig = require('./config/db');


var connectToMongo = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(dbConfig.url, options);
};
connectToMongo();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connectToMongo);


// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/models/' + file);
});


// Make uploaded files static
app.use('/static', express.static(path.join(__dirname + '/uploads')));


require('./config/passport')(passport); // pass passport for configuration
// Use the passport package in our application
app.use(passport.initialize());


// Load the routes.
app.use(require('./routes'));
// app.use(function(req, res) {
//     res.sendFile(path.join(__dirname, '../client/app/index.html'));
// });

/*eslint no-console: 2*/
console.log('Listening on port 3000...');
server.listen(3000);
