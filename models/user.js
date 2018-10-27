module.exports = ({ mongoose, Schema, auth }) => {
  let userSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
  }, { timestamps: true });

  userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    try {
      // hash the password
      hash = auth.generatePasswordHash(user.password);

      // override the cleartext password with the hashed one
      user.password = hash;

      next();
    } catch (err) {
      return next(err);
    }
  });

  userSchema.statics.findByEmail = function(email, cb) {
    return this.findOne({ email: new RegExp(email, 'i') }, cb);
  };

  return mongoose.model('User', userSchema);
}