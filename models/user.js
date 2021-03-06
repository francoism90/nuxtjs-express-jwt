module.exports = ({ mongoose, Schema }) => {
  const userSchema = new Schema(
    {
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        minlength: 8,
        maxlength: 255
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 255
      }
    },
    { timestamps: true }
  );

  userSchema.pre("save", function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    try {
      // hash the password
      const hash = require("../utils/auth").generatePasswordHash(user.password);

      // override the cleartext password with the hashed one
      user.password = hash;

      next();
    } catch (err) {
      return next(err);
    }
  });

  userSchema.statics.findByEmail = function(email, cb) {
    return this.findOne({ email: new RegExp(email, "i") }, cb);
  };

  return mongoose.model("User", userSchema);
};
