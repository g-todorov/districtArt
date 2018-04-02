var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

exports.list = function(req, res) {
  Request.find().sort('created').exec(function(err, requests) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(requests);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.request);
};

exports.create = function(req, res) {
  var request = new Request({
    type: req.body.type,
    viewState: req.body.viewState,
    responseState: req.body.responseState,
    domain: req.body.domain,
    sender: req.body.sender,
    receiver: req.body.receiver
  });

  request.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(201).json(request);
    }
  });
};

exports.update = function(req, res){
  var request = req.request;
  request = _.extend(request, req.body);

  request.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(request);
    }
  });
};

exports.getRequestByReceiver = function(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return res.status(400).send({
      message: 'User ID is invalid'
    });
  }

  Request.find({receiver: req.params.userId}, function(err, request) {
    // early retrun should be refactored
    if (err) return next(err);

    if (!request) {
      return res.status(404).send({
        message: 'Requests does not have receiver'
      });
    }
    res.json(request);
  });
};


exports.requestById = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Request is invalid'
    });
  }

  Request.findById(id).exec(function(err, request) {
    if (err) return next(err);
    if (!request) {
      return res.status(404).send({
        message: 'Request not found'
      });
    }
    req.request = request;
    next();
  });
};
