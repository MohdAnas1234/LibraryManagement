import React, { useState, useEffect } from "react";
import API from "../api";
import "../style.css";

function OverdueReturns() {

  const [overdueIssues, setOverdueIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOverdueIssues();
  }, []);

  const fetchOverdueIssues = async () => {

    try {

      const response = await API.get("/issues/overdue");

      if (response.data.success) {
        setOverdueIssues(response.data.overdue || []);
      }

    } catch (err) {

      console.error(err);
      setError("Unable to load overdue returns");

    } finally {

      setLoading(false);

    }

  };

  const calculateDaysLate = (dueDate) => {
    const today = new Date();
    const returnDateObj = new Date(dueDate);
    return Math.ceil((today - returnDateObj) / (1000 * 60 * 60 * 24));
  };

  const calculateFine = (dueDate) => {
    const daysLate = calculateDaysLate(dueDate);
    return daysLate > 0 ? daysLate * 10 : 0;
  };

  return (
    <div className="page-container">

      <h2 className="page-title">⏰ Overdue Returns</h2>

      {loading && <p>Loading overdue records...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && overdueIssues.length === 0 && (
        <p>No overdue books found</p>
      )}

      {!loading && overdueIssues.length > 0 && (

        <table className="table">

          <thead>
            <tr>
              <th>Book</th>
              <th>User</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Days Late</th>
              <th>Fine (Rs)</th>
            </tr>
          </thead>

          <tbody>

            {overdueIssues.map((issue) => {

              const daysLate = calculateDaysLate(issue.returnDate);
              const fine = calculateFine(issue.returnDate);

              return (
                <tr key={issue._id}>

                  <td>{issue.bookId?.title}</td>

                  <td>{issue.userId?.name}</td>

                  <td>
                    {new Date(issue.issueDate).toLocaleDateString()}
                  </td>

                  <td>
                    {new Date(issue.returnDate).toLocaleDateString()}
                  </td>

                  <td>{daysLate}</td>

                  <td>{fine}</td>

                </tr>
              );
            })}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default OverdueReturns;