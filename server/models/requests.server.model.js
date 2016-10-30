var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
  type: {
    type: String,
    enum: ['request', 'application'],
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
  domain: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    type: {
      type: String,
      num: ['team', 'project'],
      required: true
    }
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

mongoose.model('Request', RequestSchema);
