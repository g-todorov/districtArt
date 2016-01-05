// Module dependencies.
var express = require('express');
var router = express.Router();
var users = require('../../server/controllers/users.server.controller');

//router.route('/').get(users.test);
router.route('/')
  .get(users.list)
  .post(users.create);
router.route('/:userId')
  .get(users.read)
  .put(users.update)
  .delete(users.delete);

// Finish by binding the article middleware
router.param('userId', users.userByID);

module.exports = router
