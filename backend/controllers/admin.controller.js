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
export const getAllUserProfile = async (req, res,next) => {
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
