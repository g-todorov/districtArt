// Module dependencies.
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Create the UserSchema.
var UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

// Expose the model to other objects (similar to a 'public' setter).
mongoose.model('User', UserSchema);
