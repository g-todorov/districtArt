// Module dependencies.
var express = require('express');
var router = express.Router();

//mount users.server.routes
router.use('/users', require('./users.server.routes'))

//mount users.server.routes
router.use('/artWorks', require('./artworks.server.routes'))

//route for the home screen
router.get('/', function(req, res) {
  res.send('home page')
})

module.exports = router
