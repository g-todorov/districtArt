// Module dependencies.
var express = require('express');
var passport	= require('passport');
var router = express.Router();
var studios = require('../../server/controllers/studios.server.controller');

router.route('/')
  .get(studios.list)
  .post(studios.create);

router.route('/:studioId')
  .get(passport.authenticate('jwt', {session: false}), studios.read)
//   .put(studios.update)
//   .delete(studios.delete);

// Finish by binding the user middleware
router.param('studioId', studios.studioById);

module.exports = router