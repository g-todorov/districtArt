// Module dependencies.
var mongoose = require('mongoose')
var User = mongoose.model('User')
var ArtWork = mongoose.model('ArtWork')
var errorHandler = require('./errors.server.controller')
var _ = require('lodash')

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


// Show the current User
exports.read = function(req, res) {
	res.json(req.user);
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


// User middleware
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
