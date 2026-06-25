const Book = require("../models/bookModel");

exports.post = async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "title required" });
    }

    const book = new Book(req.body);
    await book.save();
    return res.status(201).json(book);
  } catch (error) {
    return next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.title) {
      query.title = req.query.title;
    }
    if (req.query.author) {
      query.author = req.query.author;
    }
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    if (req.query.read) {
      query.read = req.query.read;
    }
    const books = await Book.find(query);
    const returnBooks = books.map((book) => {
      const newBook = book.toJSON();
      newBook.links = {};
      newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
      newBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books?genre=${encodeURIComponent(book.genre)}`;
      newBook.links.FilterByThisTitle = `http://${req.headers.host}/api/books?title=${encodeURIComponent(book.title)}`;
      newBook.links.FilterByThisAuthor = `http://${req.headers.host}/api/books?author=${encodeURIComponent(book.author)}`;
      newBook.links.FilterByReadTrue = `http://${req.headers.host}/api/books?read=${encodeURIComponent(book.read=true)}`;
      newBook.links.FilterByReadFalse = `http://${req.headers.host}/api/books?read=${encodeURIComponent(book.read=false)}`;
      return newBook;
    });
    return res.status(200).json(returnBooks);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: error.message });
  }
};
