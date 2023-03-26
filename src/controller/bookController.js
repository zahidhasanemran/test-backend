const catchAsync = require("../exception/catchAsync");
const Book = require("../model/Book");

exports.list = catchAsync(async (req, res) => {
  let { page, limit, q } = req.query;
  let options = {
    ...(q && {
      $or: [
        {
          name: {
            $regex: q,
            $options: "i",
          },
        },
        {
          author: {
            $regex: q,
            $options: "i",
          },
        },
      ],
    }),
  };

  limit = limit ? parseInt(limit) : 6;
  page = page ? parseInt(page) : 1;

  let records = await Book.paginate(options, {
    page,
    limit,
    sort: { _id: -1 },
    lean: { virtuals: true },
  });

  res.status(200).json({
    status: "success",
    message: "Fetched successfully.",
    data: records,
  });
});

exports.show = catchAsync(async (req, res) => {
  let { id } = req.params;
  let data = await Book.findById(id);

  res.status(200).json({
    status: "success",
    message: "Fetched successfully.",
    data,
  });
});

exports.store = catchAsync(async (req, res) => {
  let { name, author, edition, language, slug } = req.body;

  await Book.create({
    name,
    author,
    edition,
    language,
    slug,
  });
  res.status(200).json({
    status: "success",
    message: "Successfully book created.",
  });
});

exports.update = catchAsync(async (req, res) => {
  let { id } = req.params;
  let { name, author, edition, language, slug } = req.body;

  await Book.findByIdAndUpdate(id, {
    name,
    author,
    edition,
    language,
    slug,
  });
  res.status(200).json({
    status: "success",
    message: "Successfully book updated.",
  });
});
exports.deleteBook = catchAsync(async (req, res) => {
  let { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "Successfully Book deleted.",
  });
});
