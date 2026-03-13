import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../style.css";

function ReturnBook() {

  const [activeIssues, setActiveIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchActiveIssues();
  }, []);

  const fetchActiveIssues = async () => {

    try {

      const response = await API.get("/issues/active");

      if (response.data.success) {
        setActiveIssues(response.data.issues || []);
      }

    } catch (err) {

      console.error(err);
      setError("Unable to load issued books");

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    if (!selectedIssue || !returnDate) {
      setError("Please select issue and return date");
      return;
    }

    setLoading(true);

    try {

      const response = await API.post("/issues/return", {
        issueId: selectedIssue,
        actualReturnDate: returnDate
      });

      if (response.data.success) {

        alert("Book returned successfully");

        navigate("/user-home");

      }

    } catch (err) {

      console.error(err);
      setError(err.response?.data?.message || "Return failed");

    } finally {

      setLoading(false);

    }

  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="page-container">

      <h2 className="page-title">📚 Return Book</h2>

      {error && <p className="error">{error}</p>}

      {activeIssues.length === 0 ? (
        <p>No active issues found</p>
      ) : (

        <form onSubmit={handleSubmit} className="form">

          <div className="form-group">

            <label>Select Issue</label>

            <select
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
            >

              <option value="">-- Choose Issue --</option>

              {activeIssues.map((issue) => (

                <option key={issue._id} value={issue._id}>

                  {issue.bookId?.title} | Issued:
                  {new Date(issue.issueDate).toLocaleDateString()}
                  {" "} | Due:
                  {new Date(issue.returnDate).toLocaleDateString()}

                </option>

              ))}

            </select>

          </div>

          <div className="form-group">

            <label>Return Date</label>

            <input
              type="date"
              value={returnDate}
              max={today}
              onChange={(e) => setReturnDate(e.target.value)}
            />

          </div>

          <button className="btn" disabled={loading}>

            {loading ? "Processing..." : "Return Book"}

          </button>

        </form>

      )}

    </div>
  );
}

export default ReturnBook;