// Module dependencies.
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var _ = require('lodash');
var fs = require('fs');
var passport	= require('passport');
var cors = require('cors');
var path = require('path');
// Create the application.
var app = express();

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Connect to MongoDB
var dbConfig = require('./config/db');
// require('./config/passport')(passport); // pass passport for configuration
// require('./config/passport')(passport); // pass passport for configuration



//CORS Support
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
app.use(cors())

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(dbConfig.url, options);
};
connect();


mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);


// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

// Make uploaded files static
app.use(express.static(path.join(__dirname + '/uploads')));

require('./config/passport')(passport); // pass passport for configuration
// Use the passport package in our application
app.use(passport.initialize());

// Load the routes.
app.use(require('./routes'))
app.use(function(req, res) {
    res.sendfile(path.join(__dirname, '../client/app/index.html'));
});


console.log('Listening on port 3000...');
app.listen(3000);
