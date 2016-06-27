// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the UserSchema.
// mongoose.Schema.Types.ObjectId
var ArtworkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  fileSystemName: {
    type: String,
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
mongoose.model('ArtWork', ArtworkSchema);
