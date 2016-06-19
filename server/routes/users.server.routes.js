// Module dependencies.
var express = require('express');
var passport	= require('passport');
var router = express.Router();
var users = require('../../server/controllers/users.server.controller');

//router.route('/').get(users.test);
router.get('/list', users.list);
router.post('/', users.create);
router.route('/:userId')
  .put(users.update)
  .delete(users.delete);
router.post('/signup', users.signup);
router.post('/authenticate', users.authenticate);
router.get('/:userId', passport.authenticate('jwt', { session: false}), users.read);

// Finish by binding the user middleware
router.param('userId', users.userByID);

module.exports = router
