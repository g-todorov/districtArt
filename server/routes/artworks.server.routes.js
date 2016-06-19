// Module dependencies.
var artWorks = require('../../server/controllers/artworks.server.controller');
var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


//router.route('/').get(artWorks.test);
router.route('/')
  .get(artWorks.list)
  // .post(artWorks.create);
router.route('/:artWorksId')
  .get(artWorks.read)
  .put(artWorks.update)
  .delete(artWorks.delete);
router.route('/:artWorksId/owners')
  .get(artWorks.allOwners);

router.post('/', upload.any(), artWorks.create)

// Finish by binding the article middleware
router.param('artWorksId', artWorks.artWorkById);

module.exports = router
