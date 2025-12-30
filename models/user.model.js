import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // For manual login
    password: {
      type: String,
      select: false, // never return password by default
    },

    // For Google OAuth
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows multiple null values
    },

    avatar: {
      type: String,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}

// Prevent model overwrite in dev (nodemon)
const User = mongoose.model("User", userSchema);

export default User;
