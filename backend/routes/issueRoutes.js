const express = require("express");
const router = express.Router();

const {
  issueBook,
  returnBook,
  getActiveIssues
} = require("../controllers/issueController");

router.post("/issue", issueBook);
router.post("/return", returnBook);
router.get("/active", getActiveIssues);

module.exports = router;