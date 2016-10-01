// Module dependencies.
var express = require('express');
var passport	= require('passport');
var router = express.Router();
var studios = require('../../server/controllers/studios.server.controller');

router.route('/')
  .get(studios.list)
  .post(studios.create);

router.route('/:studioId')
  .get(studios.read);
//   .put(studios.update)
//   .delete(studios.delete);

router.put('/addNewAdmin/:studioId', studios.addNewAdmin)

// Finish by binding the user middleware
router.param('studioId', studios.studioById);

module.exports = router;
