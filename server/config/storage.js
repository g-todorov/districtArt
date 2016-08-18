var multer  = require('multer');
var fs = require('fs-extra');

var storage = multer.diskStorage({
  destination: function (req, file, next) {

    // This folder is set only for prototype purposes. Storing in cloud is better solution i.e.
    var rootPath = './uploads/'

    var userId = req.body.details.userId
    var artworkName = req.body.details.artworkName
    //var dir = '/tmp/this/path/does/not/exist'
    var artWorkFolderPath = rootPath + userId + '/' + artworkName

    //next(null, artWorkFolderPath)
    fs.ensureDir(artWorkFolderPath, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        next(null, artWorkFolderPath);
      }
    })
  },
  filename: function (req, file, next) {
      var datetimestamp = Date.now();
      var fileExtension = '.' + file.originalname.split('.')[file.originalname.split('.').length -1]
      var fileSystemName = file.originalname.replace(fileExtension, '-' + datetimestamp + fileExtension)

      //pass fileSystemNames to the controller
      if (!req.body.details.fileSystemNames) {
        req.body.details.fileSystemNames = []
      }
      req.body.details.fileSystemNames.push(fileSystemName)

      next(null, fileSystemName)
  }
})

module.exports = multer({ storage: storage }).array('files', 10);
