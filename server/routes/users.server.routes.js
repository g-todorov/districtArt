// Module dependencies.
var express = require('express');
var passport	= require('passport');
var router = express.Router();
var users = require('../../server/controllers/users.server.controller');

router.route('/')
  .get(users.list)

router.route('/:userId')
  .get(passport.authenticate('jwt', {session: false}), users.read)
  .put(users.update)
  .delete(users.delete);

router.post('/authenticate', users.authenticate);
router.post('/register', users.create);

// Finish by binding the user middleware
router.param('userId', users.userByID);

module.exports = router
