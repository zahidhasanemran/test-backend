require("dotenv").config();
const process = require("process");
const app = require("./app");
const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server is on 🔥 on port ${port}`);
});
