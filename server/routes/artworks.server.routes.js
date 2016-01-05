// Module dependencies.
var express = require('express');
var router = express.Router();
var artWorks = require('../../server/controllers/artworks.server.controller');

//router.route('/').get(artWorks.test);
router.route('/')
  .get(artWorks.list)
  .post(artWorks.create);
router.route('/:artWorksId')
  .get(artWorks.read)
  .put(artWorks.update)
  .delete(artWorks.delete);
router.route('/:artWorksId/owners')
  .get(artWorks.allOwners);

// Finish by binding the article middleware
router.param('artWorksId', artWorks.artWorkById);

module.exports = router
