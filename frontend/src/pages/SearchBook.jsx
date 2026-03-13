import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../style.css";

function SearchBook() {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSearch = async (e) => {

    e.preventDefault();
    setError("");

    if (!title && !author && !category) {
      setError("Please enter at least one search field");
      return;
    }

    setLoading(true);

    try {

      const response = await API.get("/books/search", {
        params: {
          ...(title && { title }),
          ...(author && { author }),
          ...(category && { category })
        }
      });

      if (response.data.success) {

        navigate("/search-results", {
          state: { books: response.data.books || [] }
        });

      }

    } catch (err) {

      console.error(err);
      setError(err.response?.data?.message || "Search failed");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="page-container">

      <h2 className="page-title">🔎 Search Books</h2>

      <form onSubmit={handleSearch} className="form">

        <div className="form-group">

          <label>Book Title</label>

          <input
            type="text"
            placeholder="Enter book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

        </div>

        <div className="form-group">

          <label>Author</label>

          <input
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

        </div>

        <div className="form-group">

          <label>Category</label>

          <input
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

        </div>

        {error && <p className="error">{error}</p>}

        <button className="btn" disabled={loading}>

          {loading ? "Searching..." : "Search"}

        </button>

      </form>

    </div>
  );
}

export default SearchBook;