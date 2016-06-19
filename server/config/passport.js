var JwtStrategy = require('passport-jwt').Strategy;

// load up the user model
//var User = require('../models/users.server.model');
var mongoose = require('mongoose')
var User = mongoose.model('User')
var config = require('./db'); // get db config file

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
  }));
};
