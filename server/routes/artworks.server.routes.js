// Module dependencies.
var artworks = require('../../server/controllers/artworks.server.controller');
var express = require('express');
var router = express.Router();
var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })
//var multerConfig = require('../config/multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      req.body.fileSystemName = [req.body.fileName + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]]
      cb(null, req.body.fileName + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
})

var upload = multer({ storage: storage })

router.route('/')
  .get(artworks.list)
  // .post(artworks.create);
router.route('/:artworksId')
  .get(artworks.read)
  .put(artworks.update)
  .delete(artworks.delete);
router.route('/:artworksId/owners')
  .get(artworks.allOwners);

//router.post('/', upload.any(), artworks.create)
router.post('/', upload.any(), artworks.create)
//router.get('/test/:artworksId', artworks.read)

// Finish by binding the article middleware
router.param('artworksId', artworks.artworkById);

module.exports = router
