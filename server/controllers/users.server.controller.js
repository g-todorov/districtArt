// Module dependencies.
var mongoose = require('mongoose')
var User = mongoose.model('User')
var ArtWork = mongoose.model('ArtWork')
var errorHandler = require('./errors.server.controller')
var _ = require('lodash')
var jwt = require('jwt-simple')
var config = require('../config/db'); // get db config file


// List of Users
exports.list = function(req, res) {
	User.find().sort('userName').exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(users);
		}
	});
};


// Create a User
exports.create = function(req, res) {
	var user = new User(req.body);

	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(user);
		}
	});
};


// create a new user account (POST http://localhost:8080/api/signup)
exports.signup = function(req, res) {
	console.log('signup', req);
  if (!req.body.userName || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      userName: req.body.userName,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
};


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
exports.authenticate = function(req, res) {
  User.findOne({
    userName: req.body.userName
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token, user: _.pick(user, ['userName', '_id'])});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
};


getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};


// Show the current User
// exports.read = function(req, res) {
// 	console.log(req.user)
// 	res.json(req.user);
// };

exports.read = function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      userName: decoded.userName
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json(req.user);
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};

// Update a User
exports.update = function(req, res) {
	var user = req.user;

	user = _.extend(user, req.body);

	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};


// Delete an User
exports.delete = function(req, res) {
	var user = req.user;

	//remove Artwork dependencies from the user before deleting
	ArtWork.find({owners: user._id}, function(err, artWorks) {
		_.each(artWorks, function(artWork) {
				if (artWork.owners.length == 1) {
					artWork.remove(function(err){
						if (err) {
							return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
							});
						}
					});
				}
				else {
					artWork.owners = _.remove(artWork.owners, function(owner){
						return !owner.equals(user._id);
					});
					artWork.save(function(err) {
						if (err) {
							return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
							});
						}
					});
				}
		});
	});


	user.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};


//User middleware
exports.userByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'User is invalid'
		});
	}

	User.findById(id).exec(function(err, user) {
		if (err) return next(err);
		if (!user) {
			return res.status(404).send({
  				message: 'User not found'
  			});
		}
		req.user = user;
		next();
	});
};
