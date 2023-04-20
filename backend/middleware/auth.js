const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  
  const token  = req.headers.authorization;
  // const {token}  = req.cookies;
  // console.log(token,"TOKEN");
// return 0
    if (!token) {
        // throw new ErrorHander("Please Login to access this resource", 401);
        throw new Error("Please Login to access this resource", 401);
      }
    
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      
    
      req.user = await User.findById(decodedData.id);
      // console.log(req.user);
    
      next();
})

exports.authorizeRoles = (...roles) => {
  console.log(...roles);
 return (req, res, next) => {
  console.log("role"+req.user.role);
      if (!roles.includes(req.user.role)) {
        return next(
           new ErrorHander(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
}