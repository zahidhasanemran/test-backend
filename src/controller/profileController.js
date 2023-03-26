const catchAsync = require("../exception/catchAsync");

exports.info = catchAsync(async (req, res) => {
  let { user } = req;
  res.status(200).json({
    status: "success",
    message: "Fetched successfully",
    data: user,
  });
});
