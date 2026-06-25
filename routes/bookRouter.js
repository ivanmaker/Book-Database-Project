const express = require("express");
const booksController = require('../controllers/booksController')

function routes(Book) {
  const bookRouter = express.Router();

  bookRouter
    .post("/books", booksController.post)
    .get("/books", booksController.get);

  bookRouter.use("/books/:bookId", async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.bookId);

      if (book) {
        req.book = book;
        return next();
      }
    } catch (error) {
      return res.sendStatus(404, { message: error.message });
    }
  });
  bookRouter
    .get("/books/:bookId", async (req, res) => {
      res.json(req.book);
    })
    .put("/books/:bookId", async (req, res) => {
      try {
        const { book } = req;
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;
        await book.save();
        return res.status(200).json(book);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    })
    .patch("/books/:bookId", async (req, res) => {
      try {
        const { book } = req;
        if (req.body._id) {
          delete req.body._id;
        }
        Object.entries(req.body).forEach(([key, value]) => {
          book[key] = value;
        });
        await book.save();
        return res.status(200).json(book);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    })
    .delete("/books/:bookId", async (req, res) => {
      try {
        await req.book.deleteOne();
        return res.sendStatus(204);
      } catch (error) {
        return res.json({ message: error.message });
      }
    });
  return bookRouter;
}

module.exports = routes;
