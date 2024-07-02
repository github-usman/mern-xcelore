import { User } from "../models/user.model.js";

// Admin Register -- admin ***IT SHOULD NOT BE VISIBLE TO ANY USER OR WE CAN REMOVE AFTER ADMIN REGISTER***********
export const registerAdmin = async (req, res) => {
  try {
    const user = await User.create(req.body);
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

// Get all User Profile -- ADMIN
export const getAllUserProfile = async (req, res, next) => {
  try {
    const user = await User.find();

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

// Get single User Profile
export const getSinglUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in getSinglUserProfile:", error);
    res.status(500).json({
      success: false,
      message: `Problem due to ${error.message}`,
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
