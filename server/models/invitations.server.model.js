// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InvitationSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  sendFrom: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  },
  sendTo: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Expose the model to other objects (similar to a 'public' setter).
mongoose.model('Invitation', InvitationSchema);
