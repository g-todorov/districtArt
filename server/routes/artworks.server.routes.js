// Module dependencies.
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

//router.post('/', upload.any(), artworks.create)
// router.post('/', upload, artworks.create)
// router.post('/', upload, function(req, res) {
//   console.log(req.body)
//   console.log(req.files)
//   upload(req, res, function(err) {
//     if(err) {
//       console.log('Error Occured');
//       return;
//     }
//     console.log(req.body);
//     console.log(req.files);
//     res.end('Your File Uploaded');
//     console.log('Photo Uploaded');
//   })
// })

// router.post('/', function (req, res) {
//   upload(req, res, function (err) {
//     if (err) {
//       // An error occurred when uploading
//       return
//     }
//
//     res.end('Your File Uploaded');
//     console.log('Photo Uploaded');
//     // Everything went fine
//   })
// })
//router.get('/test/:artworksId', artworks.read)

// Finish by binding the article middleware
router.param('artworksId', artworks.artworkById);

module.exports = router
