const pool = require("../db");

const getAllBooks = async (req, res, next) => {
  try {
    const allBooks = await pool.query("select * from books");
    res.json(allBooks.rows);
  } catch (error) {
    next(error);
  }
};

const getBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    result = await pool.query("select * from books where id = ($1)", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Book not found",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  const { title, author, published_year, stock } = req.body;
  let date = new Date().toJSON();

  try {
    const result = await pool.query(
      "INSERT INTO books (title,author,published_year,stock,created_on) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [title, author, published_year, stock, date]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    result = await pool.query("delete from books where id = $1 returning *", [
      id,
    ]);

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Student not found",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, published_year, stock } = req.body;

    const result = await pool.query(
      "UPDATE books SET title = $1, author = $2, published_year = $3, stock = $4 WHERE  id = $5 returning *",
      [title, author, published_year, stock, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Book not found",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
};
