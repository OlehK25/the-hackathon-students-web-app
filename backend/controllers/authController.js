const jwt = require("jsonwebtoken");

function signAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: +process.env.JWT_SECRET_EXPIRES_IN,
  });
}

function signRefreshToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_TOKEN_KEY, {
    expiresIn: +process.env.JWT_SECRET_EXPIRES_IN_REFRESH,
  });
}

