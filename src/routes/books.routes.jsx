const { Router } = require("express");
const {
  getAllBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/books.controllers.jsx");

const booksRouter = Router();

booksRouter.get("/books", getAllBooks);
booksRouter.get("/books/:id", getBook);
booksRouter.post("/books", createBook);
booksRouter.delete("/books/:id", deleteBook);
booksRouter.put("/books/:id", updateBook);

module.exports = booksRouter; 