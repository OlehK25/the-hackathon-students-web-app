const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ users });
});

exports.changeOrSetPassword = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(userId).select("+password");

  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  if (newPassword !== confirmPassword) {
    return next(new AppError("Passwords do not match!", 400));
  }

  if (newPassword.includes(" ") || confirmPassword.includes(" ")) {
    return next(new AppError("Password cannot contain spaces!", 400));
  }

  if (newPassword.length < 8) {
    return next(
      new AppError("Password must be at least 8 characters long!", 400),
    );
  }

  // Check if the user adds a new password (for OAuth users without a password)
  if (
    !user.password &&
    currentPassword === "" &&
    user.provider &&
    user.providerAccountId
  ) {
    if (!newPassword || !confirmPassword) {
      return next(
        new AppError("Please provide and confirm the new password!", 400),
      );
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Password set successfully",
    });
  }

  // Verification for users who change their existing password
  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new AppError("Please provide all required fields!", 400));
  }
  const f = await user.correctPassword(currentPassword, user.password);

  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong!", 400));
  }

  if (currentPassword === newPassword) {
    return next(
      new AppError("New password cannot be the same as the old password!", 400),
    );
  }

  user.password = newPassword;
  user.passwordChangedAt = Date.now();
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!user) return next(new AppError("No user found with that ID!", 404));

  const hasPassword = !!user.password;

  user.password = undefined;

  res.status(200).json({
    user,
    hasPassword,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user._id);

  if (!user) return next(new AppError("No user found with that ID!", 404));

  res.status(204).json({
    status: "success",
  });
});
