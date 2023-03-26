const AppError = require("../exception/AppError");
const catchAsync = require("../exception/catchAsync");
const Book = require("../model/Book");
const slugGenerator = require("../utils/slugGenerator");
const simpleValidator = require("./simpleValidator");

exports.storeValidator = catchAsync(async (req, res, next) => {
  let rules = {
    name: "required",
    author: "required",
    language: "required",
    edition: "required",
  };
  simpleValidator(req.body, rules);
  let { name, edition } = req.body;
  let slug = slugGenerator(name + " " + edition);
  let checkExists = await Book.findOne({ slug, edition });
  if (checkExists) {
    throw new AppError("This book already exist", 422);
  }
  req.body.slug = slug;
  next();
});

exports.updateValidator = catchAsync(async (req, res, next) => {
  simpleValidator(req.params, { id: "required|mongoid" });
  let rules = {
    name: "required",
    author: "required",
    language: "required",
    edition: "required",
  };
  simpleValidator(req.body, rules);
  let { id } = req.params;
  let { name, edition } = req.body;
  let slug = slugGenerator(name + " " + edition);
  let book = await Book.findOne({ _id: id });
  if (!book) {
    throw new AppError("book not found!", 422);
  }
  let checkExists = await Book.findOne({ slug, edition, _id: { $ne: id } });
  if (checkExists) {
    throw new AppError("This book already exist", 422);
  }
  req.body.slug = slug;
  next();
});

exports.deleteValidator = catchAsync(async (req, res, next) => {
  let rules = {
    id: "required|mongoid",
  };
  simpleValidator(req.params, rules);
  let { id } = req.params;
  let book = await Book.findById(id);
  if (!book) {
    throw new AppError("book not found!", 422);
  }
  req.body.book = book;
  next();
});
