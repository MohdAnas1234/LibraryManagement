import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../style.css";

function SearchResults() {

  const location = useLocation();
  const results = location.state?.books || [];

  return (
    <div className="page-container">

      <h2 className="page-title">📚 Search Results</h2>

      {results.length === 0 ? (

        <p>No books found matching your search.</p>

      ) : (

        <table className="table">

         
            <thead>
  <tr>
    <th>Title</th>
    <th>Author</th>
    <th>Category</th>
    <th>Available Copies</th>
    <th>Action</th>
  </tr>
</thead>
          

         <tbody>
  {results.map((book) => (
    <tr key={book._id}>
      <td>{book.title || "N/A"}</td>
      <td>{book.author || "N/A"}</td>
      <td>{book.category || "N/A"}</td>
      <td>{book.availableCopies ?? 0}</td>
      <td>
        {book.availableCopies > 0 ? (
          <Link to="/issue-book" className="btn btn-primary">
            Issue
          </Link>
        ) : (
          "Not Available"
        )}
      </td>
    </tr>
  ))}
</tbody>
                

        </table>

      )}

      <Link to="/search-book" className="btn back-btn">

        Back to Search

      </Link>

    </div>
  );
}

export default SearchResults;