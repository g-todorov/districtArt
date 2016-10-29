var mongoose = require('mongoose');
var User = mongoose.model('User');
var Artwork = mongoose.model('Artwork');
var Invitation = mongoose.model('Invitation');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');
var jwt = require('jwt-simple');
var config = require('../config/db');


exports.list = function(req, res) {
  User.find().sort('userName').exec(function(err, users) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(users);
    }
  });
};


exports.create = function(req, res) {
  if (!req.body.userName || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      role: req.body.role
    });

    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
};


exports.authenticate = function(req, res) {
  User.findOne({
    userName: req.body.userName
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token, user: _.pick(user, ['userName', '_id'])});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
};


exports.read = function(req, res) {
  req.user.password = undefined
  res.json(req.user);
};


exports.update = function(req, res) {
  var user = req.user;
  user = _.extend(user, req.body);

  user.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(user);
    }
  });
};


exports.delete = function(req, res) {
  var user = req.user;
  //remove Artwork dependencies from the user before deleting
  Artwork.find({owners: user._id}, function(err, artWorks) {
    _.each(artWorks, function(artWork) {
      if (artWork.owners.length == 1) {
        artWork.remove(function(err){
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          }
        });
      }
      else {
        artWork.owners = _.remove(artWork.owners, function(owner){
          return !owner.equals(user._id);
        });
        artWork.save(function(err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          }
        });
      }
    });
  });


  user.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(user);
    }
  });
};


exports.checkIfUserApplied = function(req, res) {
  Invitation.findOne({
    'domain.id': {$in: [req.query.domainId]},
    'domain.type': {$in: [req.query.domainType]},
    responseState: 'pending'
  }, function (err, invitation){
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    if(!invitation) {
      res.json({applied: false})
    } else {
      if((invitation.sender.equals(req.user._id) && invitation.type == 'application') || (invitation.receiver.equals(req.user._id) && invitation.type == 'invitation')){
        res.json({applied: true})
      }
    }
  });
}


exports.getNotRequestedUsers = function(req, res) {
  Invitation.find({
    'domain.id': {$in: [req.query.domainId]},
    'domain.type': {$in: [req.query.domainType]},
    responseState: 'pending'})
  .exec(function(err, invitations){
    invitedUsers = invitations.map(function(invitation){
      if(invitation.type == 'application') {
        return invitation.sender
      } else if(invitation.type == 'invitation'){
        return invitation.receiver
      }
    })
    invitedUsers.push(req.user._id)
    User.find({
      _id: {$nin: invitedUsers}
    })
    .exec(function(err, users){
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(users);
      }
    })
  })
}


exports.userById = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id).exec(function(err, user) {
    if (err) return next(err);
    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      });
    }
    req.user = user;
    next();
  });
};
