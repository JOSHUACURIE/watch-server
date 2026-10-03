const mongoose = require("mongoose");

const ROLES = Object.freeze({ ADMIN: "admin", USER: "user" });

const userSchema = new mongoose.Schema(
  {
    

    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "invalid email format"],
    },

    passwordHash: {
      type: String,
      required: [true, "password is required"],
      
    },

    displayName: { type: String, trim: true, maxlength: 100 },
    bio: { type: String, maxlength: 500 },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
   
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }   
);

module.exports = mongoose.model("User", userSchema);