// Module dependencies.
var artWorks = require('../../server/controllers/artworks.server.controller');
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
      req.body.fileSystemName = req.body.fileName + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]
      cb(null, req.body.fileName + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
})

var upload = multer({ storage: storage })

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

//router.post('/', upload.any(), artWorks.create)
router.post('/', upload.any(), artWorks.create)

// Finish by binding the article middleware
router.param('artWorksId', artWorks.artWorkById);

module.exports = router
