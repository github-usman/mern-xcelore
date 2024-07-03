import catchAysncErrors from "../middlewares/catchAysncErrors.js";
import { User } from "../models/user.model.js";
import sendToken from "../utils/jwt-tokens.js";
import ErrorHander from "../utils/error-handler.js"

// user Register
export const registerUser = catchAysncErrors(async (req, res) => {

    const { first_name, last_name, email, password } = req.body;
    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
    });
    sendToken(user, 200, res);
});

// User Login
export const loginUser = catchAysncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    // checking credentials verfication

    if (!email || !password) {
      return next(new ErrorHander("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

export const logoutUser = catchAysncErrors(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});


// Get user profile
export const profileUser = catchAysncErrors(async (req, res) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
});

// Update User Profile
export const updateUserProfile = catchAysncErrors(async (req, res) => {

    const newUserData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    };
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    
    res.status(200).json({
      success: true,
      user,
    });
 
});



// Delete a User
export const deleteUser = catchAysncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHander(`User doest not exist with this id : ${req.params.id}`, 400));
  }

  await User.findByIdAndDelete(user);

  res.status(200).json({
    success: true,
    message: "User Delete Successfully!",
  });
});