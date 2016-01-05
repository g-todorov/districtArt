// Module dependencies.
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Create the UserSchema.
// mongoose.Schema.Types.ObjectId
var ArtworkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owners: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  }
});

// Expose the model to other objects (similar to a 'public' setter).
mongoose.model('ArtWork', ArtworkSchema);
