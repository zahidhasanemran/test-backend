const express = require("express");
const cors = require("cors");
require("./src/config/db");
const body_parser = require("body-parser");

let app = express();
app.use(cors());
app.use(body_parser.urlencoded({ extended: true, limit: "50mb" }));
app.use(body_parser.json({ extended: true, limit: "50mb" }));
const router = require("./src/route/http");
const AppError = require("./src/exception/AppError");
const globalError = require("./src/exception/globalError");
app.use(router);

app.get("/", (req, res) => {
  res.json({
    message: "Server is on 🔥",
  });
});
app.all("*", (req, res, next) => {
  next(
    new AppError(`Can't find route ${req.originalUrl} on this Node server`, 404)
  );
});

app.use(globalError);
module.exports = app;
