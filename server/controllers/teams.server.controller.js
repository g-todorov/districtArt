var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var errorHandler = require('./errors.server.controller');

exports.list = function(req, res) {
  Team.find().sort('teamName').exec(function(err, teams) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(teams);
    }
  });
};


exports.read = function(req, res) {
  res.json(req.team);
};


exports.create = function(req, res) {
  var team = new Team({
    teamName: req.body.teamName,
    teamDescription: req.body.teamDescription,
    creator: req.body.creator,
    admins: [req.body.admins],
    projects: req.body.selectedProjects,
    visibility: req.body.visibility
  });


  team.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(201).json(team);
    }
  });

};


exports.addNewAdmin = function(req, res) {
  var team = req.team
  var newAdminId = req.body.newAdminId;
  req.team.admins.push(newAdminId);

  team.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(201).json(team);
    }
  });
};


// Team middleware
exports.teamById = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Team is invalid'
    });
  }

  Team.findById(id).exec(function(err, team) {
    if (err) return next(err);
    if (!team) {
      return res.status(404).send({
        message: 'Team not found'
      });
    }
    req.team = team;
    next();
  });
};
