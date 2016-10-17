var artworks = require('../../server/controllers/artworks.server.controller');
var express = require('express');
var router = express.Router();

router.route('/')
  .get(artworks.list)
  .post(artworks.create);
router.route('/:artworksId')
  .get(artworks.read)
  .put(artworks.update)
  .delete(artworks.delete);
router.route('/:artworksId/owners')
  .get(artworks.allOwners);


router.param('artworksId', artworks.artworkById);

module.exports = router
