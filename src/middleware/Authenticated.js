const AppError = require("../exception/AppError");
const catchAsync = require("../exception/catchAsync");
const WebToken = require("../model/WebToken");
const moment = require("moment");
module.exports = catchAsync(async (req, res, next) => {
  let authenticated = false;
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Bearer token is required", 401);
  }
  try {
    let webToken = await WebToken.findOne({ token }).populate(["user"]);
    console.log(
      "🚀 ~ file: Authenticated.js ~ line 20 ~ module.exports=catchAsync ~ webToken",
      webToken
    );
    if (!webToken) {
      return next(new AppError("Invalid token provided", 401));
    }

    if (webToken.expireAt && moment.utc(webToken.expireAt) < moment.utc()) {
      return next(new AppError("Token longibility expired", 401));
    }

    let { user } = webToken;
    if (!user) {
      return next(
        new AppError(
          "The user belonging to this takes does no longer exist",
          401
        )
      );
    }

    if (user) {
      req.user = user;
      req.token = token;
      authenticated = true;
    }
  } catch (error) {
    return next(
      new AppError("The user belonging to this takes does no longer exist", 401)
    );
  }

  if (!authenticated) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  next();
});
