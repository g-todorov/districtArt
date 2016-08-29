// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InvitationSchema = new Schema({
  type: {
    type: String,
    enum: ['invitation', 'application'],
    required: true
  },
  responseState: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    required: true
  },
  viewState: {
    type: String,
    enum: ['read', 'unread'],
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Expose the model to other objects (similar to a 'public' setter).
mongoose.model('Invitation', InvitationSchema);
