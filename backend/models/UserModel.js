import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    isAdmin: {
      type: mongoose.SchemaTypes.Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// Instance method to transform the user document before sending it
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  // Remove fields you don't want to expose
  delete userObject.password;

  return userObject;
};
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
