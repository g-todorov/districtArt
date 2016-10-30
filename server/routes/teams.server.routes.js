// Module dependencies.
var express = require('express');
var passport	= require('passport');
var router = express.Router();
var teams = require('../../server/controllers/teams.server.controller');

router.route('/')
  .get(teams.list)
  .post(teams.create);

router.route('/:teamId')
  .get(teams.read);
//   .put(teams.update)
//   .delete(teams.delete);

router.put('/addNewAdmin/:teamId', teams.addNewAdmin)

router.param('teamId', teams.teamById);

module.exports = router;
