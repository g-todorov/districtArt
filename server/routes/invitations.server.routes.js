// Module dependencies.
var express = require('express');
var passport	= require('passport');
var router = express.Router();
var invitations = require('../../server/controllers/invitations.server.controller');

router.route('/')
  .get(invitations.list)
  .post(invitations.create);

router.route('/:invitationId')
  .get(invitations.read)
  .put(passport.authenticate('jwt', {session: false}), invitations.update);
//   .delete(studios.delete);

router.get('/getInvitationByReceiver/:userId', invitations.getInvitationByReceiver);

router.param('invitationId', invitations.invitationById);

module.exports = router
