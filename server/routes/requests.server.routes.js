// Module dependencies.
var express = require('express');
var passport	= require('passport');
var router = express.Router();
var requests = require('../../server/controllers/requests.server.controller');

router.route('/')
  .get(requests.list)
  .post(requests.create);

router.route('/:requestId')
  .get(requests.read)
  .put(passport.authenticate('jwt', {session: false}), requests.update);
//   .delete(teams.delete);

router.get('/getRequestByReceiver/:userId', requests.getRequestByReceiver);

router.param('requestId', requests.requestById);

module.exports = router
