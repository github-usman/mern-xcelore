import catchAysncErrors from "../middlewares/catchAysncErrors.js";
import { User } from "../models/user.model.js";
import ErrorHander from "../utils/error-handler.js"
// Admin Register -- admin ***IT SHOULD NOT BE VISIBLE TO ANY USER OR WE CAN REMOVE AFTER ADMIN REGISTER***********
export const registerAdmin = catchAysncErrors(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    user,
  });
});

// Get all User Profile -- ADMIN
export const getAllUserProfile = catchAysncErrors(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    success: true,
    user,
  });
});

// Get single User Profile
export const getSinglUserProfile = catchAysncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHander(`User not found`, 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Profile
export const updateUserProfile = catchAysncErrors(async (req, res, next) => {
  const isUserId = await User.findById(req.params.id);
  const newUserData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };

  if (!isUserId) {
    return next(new ErrorHander(`User doest not exist with this id : ${req.params.id}`, 400));
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
});

// Delete a User
export const deleteUser = catchAysncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHander(`User doest not exist with this id : ${req.params.id}`, 400));
  }

  await User.findByIdAndDelete(user);

  res.status(200).json({
    success: true,
    message: "User Delete Successfully!",
  });
});
