var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var User = mongoose.model('User');

var errorHandler = require('./errors.server.controller');
var _ = require('lodash');
var upload = require('../config/storage');

exports.list = function(req, res) {
  Project.find().sort('projectName').exec(function(err, projects) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(projects);
    }
  });
};

exports.getProjectsByUserId = function(req, res) {
  Project.find({owners: { $in: [req.query.userId]}}, function(err, projects) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(projects);
    }
  });
};

exports.create = function(req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    var filesDictionary = req.body.details.filesDictionary;
    var files = _.toArray(filesDictionary);

    var project = new Project({
      projectName: req.body.details.projectName,
      projectDescription: req.body.details.projectDescription,
      visibility: req.body.details.visibility,
      files: files,
      creator: req.body.details.userId,
      owners: [req.body.details.userId]
    });

    project.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.status(201).json(project);
      }
    });
  });
};

exports.read = function(req, res) {
  res.json(req.project);
};

exports.update = function(req, res) {
  var project = req.project;
  // req.body.owners = utilities.remapIds(req.body.owners);
  project = _.extend(project, req.body);

  project.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(project);
    }
  });
};

exports.addNewOwner = function(req, res) {
  var project = req.project;
  var newOwnerId = req.body.newOwnerId;
  req.project.owners.push(newOwnerId);

  project.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(201).json(project);
    }
  });
};

exports.delete = function(req, res) {
  var project = req.project;

  project.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(project);
    }
  });
};

exports.allOwners = function (req, res) {
  User.find({'_id': { $in: req.project.owners}}, function(err, docs){
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(docs);
    }
  });
};

exports.projectById = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'project is invalid'
    });
  }

  Project.findById(id).exec(function(err, project) {
    if (err) return next(err);
    if (!project) {
      return res.status(404).send({
        message: 'project not found'
      });
    }
    req.project = project;
    next();
  });
};
