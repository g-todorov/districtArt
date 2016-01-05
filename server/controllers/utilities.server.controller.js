// Module dependencies.
var mongoose = require('mongoose')
var _ = require('lodash')

// Utility function to return array of mongoose ObjectIds
exports.remapIds = function(arrayWithIds) {
  var newArrayWithIds = [];
  if (arrayWithIds.length > 0) {
      _.map(arrayWithIds, function(id) {
          // push arrayWithIds id (converted from string to mongo object id)
          // into newArrayWithIds
          newArrayWithIds.push(mongoose.Types.ObjectId(id));
      });
  }
  return newArrayWithIds
};
