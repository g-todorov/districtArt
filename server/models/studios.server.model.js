// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the StudioSchema.
var StudioSchema = new Schema({
  studioName: {
    type: String,
    required: true
  },
  studioDescription: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  artworks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true
  }],
  created: {
    type: Date,
    default: Date.now
  }
});

// Expose the model to other objects (similar to a 'public' setter).
mongoose.model('Studio', StudioSchema);
