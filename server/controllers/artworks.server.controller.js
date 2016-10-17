var mongoose = require('mongoose');
var Artwork = mongoose.model('Artwork');
var User = mongoose.model('User');

var errorHandler = require('./errors.server.controller');
var _ = require('lodash')
var fs = require('fs');
var upload = require('../config/storage');
var util = require('util');
var utilities = require ('./utilities.server.controller');

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


// exports.listPublicProjects = function(req, res) {
//   User.find({'owners': {$in: req.query.userId}}, function(err, docs){
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.json(docs);
//     }
//   });
// }


// Create an Artwork
exports.create = function(req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    var filesDictionary = req.body.details.filesDictionary
    var files = _.toArray(filesDictionary);

    var artwork = new Artwork({
      artworkName: req.body.details.artworkName,
      artworkDescription: req.body.details.artworkDescription,
      visibility: req.body.details.visibility,
      files: files,
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
  var artwork = req.artwork;
  console.log(req.body)
  // req.body.owners = utilities.remapIds(req.body.owners);
  artwork = _.extend(artwork, req.body);

  artwork.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(artwork);
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
