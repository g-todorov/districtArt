var mongoose = require('mongoose');
var Studio = mongoose.model('Studio');
var errorHandler = require('./errors.server.controller');

exports.list = function(req, res) {
  Studio.find().sort('studioName').exec(function(err, studios) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(studios);
    }
  });
};


exports.read = function(req, res) {
  res.json(req.studio);
};


exports.create = function(req, res) {
  var studio = new Studio({
    studioName: req.body.studioName,
    studioDescription: req.body.studioDescription,
    creator: req.body.creator,
    admins: [req.body.admins],
    artworks: req.body.selectedArtworks
  });


  studio.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(201).json(studio);
    }
  });

};


exports.addNewAdmin = function(req, res) {
  var studio = req.studio
  var newAdminId = req.body.newAdminId;
  req.studio.admins.push(newAdminId);

  studio.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(201).json(studio);
    }
  });
};


// Studios middleware
exports.studioById = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Studio is invalid'
    });
  }

  Studio.findById(id).exec(function(err, studio) {
    if (err) return next(err);
    if (!studio) {
      return res.status(404).send({
        message: 'Studio not found'
      });
    }
    req.studio = studio;
    next();
  });
};
