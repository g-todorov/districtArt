// Module dependencies.
var mongoose = require('mongoose');
var Artwork = mongoose.model('ArtWork');
var User = mongoose.model('User');
//var users = require('./users.server.controller')
var errorHandler = require('./errors.server.controller');
var utilities = require ('./utilities.server.controller');
var _ = require('lodash')
var util = require('util');
var fs = require('fs');
var upload = require('../config/storage');

// List of ArtWorks
exports.list = function(req, res) {
	Artwork.find().sort('artWorkName').exec(function(err, artWorks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(artWorks);
		}
	});
};


// Create an Artwork
exports.create = function(req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log ("An error occurred when uploading")
      return
    }

		var artwork = new Artwork({
			name: req.body.fileName,
			fileSystemName: req.body.fileSystemName,
			owners: [req.body.userId]
		});

		artwork.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.status(201).json(artwork);
			}
		});
  })
};


// Show the current ArtWork
exports.read = function(req, res) {
	console.log(req.body)
	res.json(req.artwork);
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
exports.artworkById = function(req, res, next, id) {
	console.log('test')
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'ArtWork is invalid'
		});
	}

	Artwork.findById(id).exec(function(err, artwork) {
		if (err) return next(err);
		if (!artwork) {
			return res.status(404).send({
  				message: 'ArtWork not found'
  			});
		}
		req.artwork = artwork;
		next();
	});
};
