const AppError = require("../exception/AppError");
const catchAsync = require("../exception/catchAsync");
const User = require("../model/User");
const simpleValidator = require("./simpleValidator");

exports.loginValidation = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;
  let rules = {
    email: "required|email",
    password: "required",
  };

  await simpleValidator(req.body, rules);

  let user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Invalid email provided", 422));
  }
  const checkPassword = await user
    .correctPassword(password, user.password)
    .catch((error) => {
      return next(new AppError(error.message, 422));
    });
  if (!checkPassword) {
    return next(new AppError("Credentials did not match", 422));
  }
  req.body.user = user;
  next();
});
exports.registerValidation = catchAsync(async (req, res, next) => {
  let rules = {
    email: "required|email",
    username: "required",
    name: "required",
    password: "required",
  };

  await simpleValidator(req.body, rules);

  let { email, password, username } = req.body;
  let isValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
    password
  );
  if (!isValid) {
    return next(
      new AppError(
        "Password must be at least 8 characters with 1 upper case letter and 1 number and 1 special character!",
        422
      )
    );
  }
  let checkUserName = await User.findOne({ username });
  if (checkUserName) {
    return next(new AppError("This username already exists", 422));
  }
  let checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return next(new AppError("This email already exists", 422));
  }
  next();
});
