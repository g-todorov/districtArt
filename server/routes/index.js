var express = require('express');
var router = express.Router();

router.use('/users', require('./users.server.routes'))
router.use('/artworks', require('./artworks.server.routes'))
router.use('/studios', require('./studios.server.routes'))
router.use('/invitations', require('./invitations.server.routes'))


router.get('/', function(req, res) {
  res.send('server home page')
})

module.exports = router
