var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
      console.log(req.body)
      console.log(file)
      var datetimestamp = Date.now();
      req.body.fileSystemName = [req.body.fileName + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]]
      cb(null, req.body.fileName + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
})

module.exports = multer({ storage: storage }).array('file', 1);
