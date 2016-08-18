// Module dependencies.
var express = require('express');
var passport	= require('passport');
var router = express.Router();
var invitations = require('../../server/controllers/invitations.server.controller');

router.route('/')
  .get(invitations.list)
  .post(invitations.create);

router.route('/:invitationId')
  .get(passport.authenticate('jwt', {session: false}), invitations.read)
//   .put(studios.update)
//   .delete(studios.delete);

// Finish by binding the user middleware
router.param('invitationId', invitations.invitationById);

module.exports = router
