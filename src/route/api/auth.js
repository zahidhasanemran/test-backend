const { login, logout } = require("../../controller/auth/loginController");
const { register } = require("../../controller/auth/registerController");
const Authenticated = require("../../middleware/Authenticated");
const authValidator = require("../../validator/authValidator");

const authRouter = require("express").Router();
require("express-group-routes");

authRouter.group("/auth", (auth) => {
  auth.post("/register", authValidator.registerValidation, register);
  auth.post("/login", authValidator.loginValidation, login);
});

authRouter.delete("/auth/logout", Authenticated, logout);

module.exports = authRouter;
