const mongoose = require("mongoose");
const mongo__db__url = process.env.MONGODB_URL;

const db = mongoose.connect(mongo__db__url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", function () {
  console.log("MongoDB is on 🔥");
});
mongoose.connection.on("error", function (error) {
  console.error("MongoDB connection interrupted!");
});

module.exports = db;
