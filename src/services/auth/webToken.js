const WebToken = require("../../model/WebToken");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const tokenLongibility = process.env.AUTH_TOKEN_LONGIBILITY || 3600;
exports.generateToken = async (userId) => {
  let token = jwt.sign({ userId }, process.env.JWT_SECRET);
  let expireAt = moment.utc().add(tokenLongibility, "seconds").toDate();
  let tokenData = {
    token,
    user: userId,
    expireAt,
  };
  return await WebToken.create(tokenData);
};

exports.extendTokenTime = async (token) => {
  let tokenInfo = await WebToken.findOne({ token: token });
  if (!tokenInfo) {
    throw new AppError("Invalid found", 422);
  }
  if (tokenInfo.expireAt && moment.utc(tokenInfo.expireAt) < moment.utc()) {
    throw new AppError("Token already expired", 422);
  }
  let expireAt = moment.utc().add(tokenLongibility, "seconds").toDate();

  tokenInfo.expireAt = expireAt;
  tokenInfo.lastRefreshedAt = moment.utc();
  await tokenInfo.save();

  return tokenInfo;
};
