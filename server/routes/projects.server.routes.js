var projects = require('../../server/controllers/projects.server.controller');
var express = require('express');
var router = express.Router();

router.route('/')
  .get(projects.list)
  .post(projects.create);

router.get('/getProjectsByUserId', projects.getProjectsByUserId);

router.route('/:projectsId')
  .get(projects.read)
  .put(projects.update)
  .delete(projects.delete);
router.route('/:projectsId/owners')
  .get(projects.allOwners);

router.put('/addNewOwner/:projectsId', projects.addNewOwner)

router.param('projectsId', projects.projectById);

module.exports = router
