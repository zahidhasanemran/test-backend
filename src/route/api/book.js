const {
  deleteBook,
  store,
  update,
  list,
  show,
} = require("../../controller/bookController");
const Authenticated = require("../../middleware/Authenticated");
const bookValidator = require("../../validator/bookValidator");

const bookRouter = require("express").Router();
require("express-group-routes");

bookRouter.group("/book", (book) => {
  bookRouter.use(Authenticated);
  book.get("/", list);
  book.get("/:id", show);
  book.post("/", bookValidator.storeValidator, store);
  book.patch("/:id", bookValidator.updateValidator, update);
  book.delete("/:id", bookValidator.deleteValidator, deleteBook);
});
module.exports = bookRouter;
