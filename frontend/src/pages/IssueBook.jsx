import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../style.css";

function IssueBook() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await API.get("/books");
      if (response.data.success) {
        setBooks(response.data.books);
      }
    } catch (err) {
      setError("Failed to fetch books");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const today = new Date().toISOString().split("T")[0];
      if (issueDate < today) {
        setError("Issue date cannot be before today");
        setLoading(false);
        return;
      }

      const response = await API.post("/issues/issue", {
        bookId: selectedBook,
        userId: user._id,
        issueDate
      });

      if (response.data.success) {
        alert("Book issued successfully!");
        navigate("/user-home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to issue book");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="page-container">
      <h1>Issue Book</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="book">Select Book:</label>
          <select
            id="book"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            required
          >
            <option value="">Choose a book</option>
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title} by {book.author} (Available: {book.availableCopies})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="issueDate">Issue Date:</label>
          <input
            type="date"
            id="issueDate"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            min={today}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Issuing..." : "Issue Book"}
        </button>
      </form>
    </div>
  );
}

export default IssueBook;
