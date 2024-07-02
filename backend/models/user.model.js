import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtExpire, jwtSecret } from "../config/env.config.js";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please Enter Your First Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [3, "Name should have more than 3 characters"],
  },
  last_name: {
    type: String,
    required: [true, "Please Enter Your Last Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [3, "Name should have more than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// Hashing Password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN GENERATION

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, jwtSecret, {
    expiresIn: jwtExpire,
  });
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


export const User = mongoose.model("User", userSchema);
