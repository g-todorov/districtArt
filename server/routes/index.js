var express = require('express');
var router = express.Router();

router.use('/users', require('./users.server.routes'))
router.use('/projects', require('./projects.server.routes'))
router.use('/teams', require('./teams.server.routes'))
router.use('/requests', require('./requests.server.routes'))


router.get('/', function(req, res) {
  res.send('server home page')
})

module.exports = router
