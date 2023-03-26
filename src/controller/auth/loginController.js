const catchAsync = require("../../exception/catchAsync");
const WebToken = require("../../model/WebToken");
const { generateToken } = require("../../services/auth/webToken");
exports.login = catchAsync(async (req, res) => {
  let { user } = req.body;
  let { token } = await generateToken(user._id, req?.currentIp, req.useragent);
  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    data: {
      token,
    },
  });
});
exports.logout = catchAsync(async (req, res) => {
  let { token } = req;
  await WebToken.findOneAndDelete({
    token,
  });

  res.status(200).json({
    status: "success",
    message: "Session destroyed successfully",
  });
});
