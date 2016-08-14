// Module dependencies.
var mongoose = require('mongoose');
var Artwork = mongoose.model('Artwork');
var User = mongoose.model('User');
//var users = require('./users.server.controller')
var errorHandler = require('./errors.server.controller');
var utilities = require ('./utilities.server.controller');
var _ = require('lodash')
var util = require('util');
var fs = require('fs');
var upload = require('../config/storage');

// List of Artworks
exports.list = function(req, res) {
  Artwork.find().sort('artworkName').exec(function(err, artworks) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(artworks);
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
      artworkName: req.body.details.artworkName,
      artworkDescription: req.body.details.artworkDescription,
      fileSystemNames: req.body.details.fileSystemNames,
      creator: req.body.details.userId,
      owners: [req.body.details.userId]
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
