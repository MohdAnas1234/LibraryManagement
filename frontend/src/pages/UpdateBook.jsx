import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

function UpdateBook({ books = [], setBooks }) {

  const [selectedBookId, setSelectedBookId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const handleSelectBook = (e) => {

    const bookId = Number(e.target.value);
    setSelectedBookId(bookId);

    const book = books.find((b) => b.id === bookId);

    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setCategory(book.category);
      setQuantity(book.quantity);
      setIsEditing(true);
    }

  };

  const handleUpdate = (e) => {

    e.preventDefault();

    if (!title || !author || !category || !quantity) {
      alert("Please fill all fields");
      return;
    }

    const updatedBooks = books.map((book) =>
      book.id === selectedBookId
        ? {
            ...book,
            title,
            author,
            category,
            quantity: Number(quantity)
          }
        : book
    );

    setBooks(updatedBooks);

    alert("Book updated successfully");

    navigate("/admin-home");

  };

  return (
    <div className="page-container">

      <h2 className="page-title">📚 Update Book</h2>

      {books.length === 0 ? (

        <p>No books available</p>

      ) : (

        <>
          <div className="form-group">

            <label>Select Book</label>

            <select
              value={selectedBookId}
              onChange={handleSelectBook}
            >

              <option value="">-- Choose Book --</option>

              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} by {book.author}
                </option>
              ))}

            </select>

          </div>

          {isEditing && (

            <form onSubmit={handleUpdate} className="form">

              <div className="form-group">
                <label>Book Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <button className="btn">
                Update Book
              </button>

            </form>

          )}

        </>
      )}

    </div>
  );
}

export default UpdateBook;