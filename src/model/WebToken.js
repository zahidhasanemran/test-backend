const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const defaults = {
  type: String,
  default: null,
};
const WebTokenSchema = new Schema(
  {
    token: { ...defaults },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: null,
    },
    lastRefreshedAt: {
      type: Date,
      default: null,
    },
    expireAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WebToken", WebTokenSchema);
