const profileController = require("../../controller/profileController");
const Authenticated = require("../../middleware/Authenticated");

const profileRouter = require("express").Router();
require("express-group-routes");

profileRouter.group("/profile", (profile) => {
  profile.use(Authenticated);
  profile.get("/info", profileController.info);
});
module.exports = profileRouter;
