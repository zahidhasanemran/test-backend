const authRouter = require("./api/auth");
const bookRouter = require("./api/book");
const profileRouter = require("./api/profile");

const router = require("express").Router();
require("express-group-routes");
router.group("/api", (api) => {
  api.use(authRouter);
  api.use(bookRouter);
  api.use(profileRouter);
  api.get("/", async (req, res) => {
    res.json({
      status: "Api server is running",
    });
  });
});

module.exports = router;
