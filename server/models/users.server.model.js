// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


// Create the UserSchema.
var UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});


/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
   var user = this;
   if (this.isModified('password') || this.isNew) {
       bcrypt.genSalt(10, function (err, salt) {
           if (err) {
               return next(err);
           }
           bcrypt.hash(user.password, salt, function (err, hash) {
               if (err) {
                   return next(err);
               }
               user.password = hash;
               next();
           });
       });
   } else {
       return next();
   }
 });


UserSchema.methods.comparePassword = function (passw, cb) {
   bcrypt.compare(passw, this.password, function (err, isMatch) {
       if (err) {
          return cb(err);
       }
       cb(null, isMatch);
   });
 };


// Expose the model to other objects (similar to a 'public' setter).
mongoose.model('User', UserSchema);
