import React, { useState, useEffect } from "react";
import API from "../api";
import "../style.css";

function ActiveIssues() {

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchActiveIssues();
  }, []);

  const fetchActiveIssues = async () => {

    try {

      const response = await API.get("/issues/active");

      if (response.data.success) {
        setIssues(response.data.issues || []);
      }

    } catch (err) {

      console.error(err);
      setError("Unable to load active issues");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="page-container">

      <h2 className="page-title">📚 Active Book Issues</h2>

      {loading && <p className="info-text">Loading issues...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && issues.length === 0 && (
        <p className="info-text">No active issues found</p>
      )}

      {!loading && issues.length > 0 && (

        <table className="table">

          <thead>
            <tr>
              <th>Book</th>
              <th>User</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {issues.map((issue) => (

              <tr key={issue._id}>

                <td>{issue.bookId?.title}</td>

                <td>{issue.userId?.name}</td>

                <td>
                  {new Date(issue.issueDate).toLocaleDateString()}
                </td>

                <td>
                  {new Date(issue.returnDate).toLocaleDateString()}
                </td>

                <td className="status-active">
                  Active
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default ActiveIssues;