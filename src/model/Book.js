const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;
const defaults = {
  type: String,
  default: null,
};
const bookSchema = new Schema(
  {
    name: { ...defaults },
    slug: { ...defaults, unique: true },
    author: { ...defaults },
    edition: { ...defaults },
    language: { ...defaults },
  },
  {
    timestamps: true,
  }
);

bookSchema.plugin(paginate);
module.exports = mongoose.model("Book", bookSchema);
