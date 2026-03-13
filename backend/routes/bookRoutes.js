const express = require("express");
const router = express.Router();

const {
  getBooks,
  addBook,
  searchBooks
} = require("../controllers/bookController");

router.get("/", getBooks);
router.post("/add", addBook);
router.get("/search", searchBooks);

module.exports = router;