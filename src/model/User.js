const mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: null,
    },
    dialCode: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "activated", "blocked"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
// password check
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
