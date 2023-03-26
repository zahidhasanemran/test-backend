const catchAsync = require("../../exception/catchAsync");
const User = require("../../model/User");
const { generateToken } = require("../../services/auth/webToken");

exports.register = catchAsync(async (req, res) => {
  let data = { ...req.body, status: "activated" };

  let user = await User.create(data);
  let token = (await generateToken(user._id)).token;
  res.json({
    status: "success",
    message: "Account verified successfully!",
    data: { token },
  });
});
