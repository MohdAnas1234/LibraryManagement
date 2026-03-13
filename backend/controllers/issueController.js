const Issue = require("../models/Issue");
const Book = require("../models/Book");

const issueBook = async (req, res) => {

  const { bookId, userId, issueDate } = req.body;

  const returnDate = new Date(issueDate);
  returnDate.setDate(returnDate.getDate() + 7);

  const issue = new Issue({
    bookId,
    userId,
    issueDate,
    returnDate
  });

  await issue.save();

  await Book.findByIdAndUpdate(bookId, {
    $inc: { availableCopies: -1 }
  });

  res.json({ success: true });

};

const returnBook = async (req, res) => {

  const { issueId, actualReturnDate } = req.body;

  const issue = await Issue.findById(issueId);

  issue.actualReturnDate = actualReturnDate;

  const lateDays = Math.ceil(
    (new Date(actualReturnDate) - issue.returnDate) / (1000 * 60 * 60 * 24)
  );

  if (lateDays > 0) {
    issue.fineAmount = lateDays * 10;
  }

  await issue.save();

  await Book.findByIdAndUpdate(issue.bookId, {
    $inc: { availableCopies: 1 }
  });

  res.json({ success: true });

};

const getActiveIssues = async (req, res) => {

  const issues = await Issue.find({ actualReturnDate: null })
    .populate("bookId")
    .populate("userId");

  res.json({ success: true, issues });

};

module.exports = {
  issueBook,
  returnBook,
  getActiveIssues
};