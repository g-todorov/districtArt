// Module dependencies.
var mongoose = require('mongoose')
var ArtWork = mongoose.model('ArtWork')
var User = mongoose.model('User')
var users = require('./users.server.controller')
var errorHandler = require('./errors.server.controller')
var utilities = require ('./utilities.server.controller')
var _ = require('lodash')
var util = require('util');
var fs = require('fs');

// List of ArtWorks
exports.list = function(req, res) {
	ArtWork.find().sort('artWorkName').exec(function(err, artWorks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(artWorks);
		}
	});
};


// Create a ArtWork
exports.create = function(req, res) {
	console.log(req.body)
	console.log(req.file)


	// artWork.save(function(err) {
	// 	if (err) {
	// 		return res.status(400).send({
	// 			message: errorHandler.getErrorMessage(err)
	// 		});
	// 	} else {
	// 		res.status(201).json(artWork);
	// 	}
	// });
};


// Show the current ArtWork
exports.read = function(req, res) {
	res.json(req.artWork);
};


// Update a ArtWork
exports.update = function(req, res) {
	var artWork = req.artWork;
	req.body.owners = utilities.remapIds(req.body.owners);
	artWork = _.extend(artWork, req.body);

	artWork.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(artWork);
		}
	});
};


// Delete an ArtWork
exports.delete = function(req, res) {
	var artWork = req.artWork;

	artWork.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(artWork);
		}
	});
};


// Returns all owners of the artWork
exports.allOwners = function (req, res) {
	User.find({'_id': { $in: req.artWork.owners}}, function(err, docs){
		 if (err) {
			 return res.status(400).send({
 				message: errorHandler.getErrorMessage(err)
 			});
		} else {
			res.json(docs);
		}
	});
};


// TODO update only artwork owner


// ArtWork middleware
exports.artWorkById = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'ArtWork is invalid'
		});
	}

	ArtWork.findById(id).exec(function(err, artWork) {
		if (err) return next(err);
		if (!artWork) {
			return res.status(404).send({
  				message: 'ArtWork not found'
  			});
		}
		req.artWork = artWork;
		next();
	});
};
