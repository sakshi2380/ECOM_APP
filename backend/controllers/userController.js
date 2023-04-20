const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const dotenv = require("dotenv");
const sendToken = require("../utils/jwtToken");

dotenv.config({
  path: "C:/Users/prati/OneDrive/Desktop/Javascript/internship/Project1/backend/config/config.env",
});
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 100,
  // height: 150,
  // Crop: 'fill',
  // });
  // console.log(myCloud);

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res);
});
// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    // return next(new ErrorHander("Please Enter Email & Password", 400));
    res.status(400).json({
      success: false,
      message: "Please Enter Email & Password",
    })
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    // return next(new ErrorHander("Invalid email or password", 401));
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    })
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    // return next(new ErrorHander("Invalid email or password", 401));
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    })
  }
  sendToken(user, 200, res);
});
// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    // return next(new ErrorHander("User not found", 404));
    res.status(404).json({
      success: false,
      message: "User not found",
    })
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password?token=${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
      resetToken,
      status: 200,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    // return next(new ErrorHander(error.message, 500));
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
  
});
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    // return next(
    //   new ErrorHander(
    //     "Reset Password Token is invalid or has been expired",
    //     400
    //   )
    // );
    res.status(400).json({
      success: false,
      message: "Reset Password Token is invalid or has been expired",
    })
  }

  if (req.body.password !== req.body.confirmPassword) {
    // return next(new ErrorHander("Password does not password", 400));
    res.status(400).json({
      success: false,
      message: "Password does not password",
    })
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const users = await User.findById(req.user.id);

  // const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
  //   new: true,
  //   runValidators: true,
  //   useFindAndModify: false,
  // });

  res.status(200).json({
    success: true,
    users,
    
  });
});
// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});



// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    // return next(new ErrorHander("Old password is incorrect", 400));
    res.status(400).json({
      success: false,
      message: "Old password is incorrect",
    })
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    // return next(new ErrorHander("password does not match", 400));
    res.status(400).json({
      success: false,
      message: "password does not match",
    })
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});


// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//get single user
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.findById(req.params.id);

  if (!users) {
    return next(
      // new ErrorHander(`User does not exist with Id: ${req.params.id}`)
      res.status(400).json({
        success: false,
        message: (`User does not exist with Id: ${req.params.id}`),
      })
    );
  }

  res.status(200).json({
    success: true,
    users,
  });
});

//update (admin) role
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      // return next(
      //   new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
      // );
      res.status(400).json({
        success: false,
        message: (`User does not exist with Id: ${req.params.id}`),
      })
    }
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
