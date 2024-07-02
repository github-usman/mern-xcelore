import { User } from "../models/user.model.js";
import sendToken from "../utils/jwt-tokens.js";

// user Register
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `problem due to ${error}`,
    });
  }
};

// user Login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // checking credentials verfication

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Enter Email & Password`,
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `Invalid email or password`,
      });
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: `Invalid email or password`,
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `problem due to ${error}`,
    });
  }
};

export const logoutUser = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};


// Get user profile
export const profileUser = async (req, res) => {
  try {
    console.log(req.params.id);

    const user = await User.findOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `problem due to ${error}`,
    });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const isUserId = await User.findById(req.params.id);
    const newUserData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    };

    if (!isUserId) {
      return res.status(400).json({
        success: true,
        message: `User doest not exist with this id : ${req.params.id}`,
      });
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `problem due to ${error}`,
    });
  }
};

// Delete a User
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(400).json({
      success: true,
      message: `User doest not exist with this id : ${req.params.id}`,
    });
  }

  await User.findByIdAndDelete(user);

  res.status(200).json({
    success: true,
    message: "User Delete Successfully!",
  });
};
