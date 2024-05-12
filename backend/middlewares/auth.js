const { verify } = require("jsonwebtoken");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const authMiddleware = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401),
    );
  }

  // 2) Verification token
  let payload;
  try {
    payload = verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    let statusCode = 401;
    if (error.name === "JsonWebTokenError") {
      error.message = "Invalid token";
    } else if (error.name === "TokenExpiredError") {
      error.message = "Your token has expired!";
    } else {
      statusCode = 500;
    }
    return next(new AppError(error.message, statusCode));
  }

  // 3) Check if user still exists

  return next();
});

module.exports.authMiddleware = authMiddleware;
