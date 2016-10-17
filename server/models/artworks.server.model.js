// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the ArtworkSchema.
var ArtworkSchema = new Schema({
  artworkName: {
    type: String,
    required: true
  },
  artworkDescription: {
    type: String,
    required: true
  },
  files: [{
    fileSystemName: {
      type: String,
      required: true
    },
    projectItemTitle: String,
    projectItemDescription: String
  }],
  visibility: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  owners: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Expose the model to other objects (similar to a 'public' setter).
mongoose.model('Artwork', ArtworkSchema);
