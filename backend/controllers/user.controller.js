import { User } from "../models/user.model.js";

// user Register
export const registerUser = async (req, res, next) => {
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
