import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import generateRandomToken from "../utils/generateRandomToken.js";
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
    isVerified: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    verificationToken: {
      type: mongoose.SchemaTypes.String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

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

  this.verificationToken = generateRandomToken();

  next();
});
userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this._update.password, salt);

      this._update.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }

  next();
});

const User = mongoose.model("User", userSchema);
export default User;
