var mongoose = require('mongoose');
var Invitation = mongoose.model('Invitation');
var errorHandler = require('./errors.server.controller');

exports.list = function(req, res) {
  Invitation.find().sort('created').exec(function(err, invitations) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(invitations);
    }
  });
};


exports.read = function(req, res) {
  res.json(req.invitation);
};


exports.create = function(req, res) {

  var invitation = new Invitation({
    studioName: req.body.studioName,
    studioDescription: req.body.studioDescription,
    creator: req.body.creator,
    admins: [req.body.admins],
    artworks: req.body.selectedArtworks
  });


  invitation.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(201).json(invitation);
    }
  });

};


// Invitations middleware
exports.invitationById = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Invitation is invalid'
    });
  }

  Invitation.findById(id).exec(function(err, invitation) {
    if (err) return next(err);
    if (!invitation) {
      return res.status(404).send({
        message: 'Invitation not found'
      });
    }
    req.invitation = invitation;
    next();
  });
};
