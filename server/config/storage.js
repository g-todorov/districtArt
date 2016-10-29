var multer  = require('multer');
var fs = require('fs-extra');
var _ = require('lodash');

var storage = multer.diskStorage({
  destination: function (req, file, next) {
    // This folder is set only for prototype purposes. Storing in cloud is better solution i.e.
    var rootPath = './uploads/';
    var userId = req.body.details.userId;
    var artworkName = req.body.details.artworkName;
    var artWorkFolderPath = rootPath + userId + '/' + artworkName;

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
    var fileExtension = '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
    var fileSystemName = file.originalname.replace(fileExtension, '-' + datetimestamp + fileExtension);

    _.assignIn(req.body.details.filesDictionary[file.originalname],
      {'fileSystemName': fileSystemName}
    )

    next(null, fileSystemName);
  }
});

module.exports = multer({storage: storage}).array('files', 10);
