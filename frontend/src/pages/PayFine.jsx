import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../style.css";

function PayFine() {

  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchIssuesWithFine();
  }, []);

  const fetchIssuesWithFine = async () => {

    try {

      const response = await API.get("/issues/active");

      if (response.data.success) {

        const issuesWithFine = (response.data.issues || []).filter(
          (issue) => issue.fineAmount > 0
        );

        setIssues(issuesWithFine);

      }

    } catch (err) {

      console.error(err);
      setError("Unable to load fines");

    } finally {

      setLoading(false);

    }

  };

  const handlePayFine = async (e) => {

    e.preventDefault();
    setError("");

    if (!selectedIssue) {
      setError("Please select an issue");
      return;
    }

    setLoading(true);

    try {

      const response = await API.post("/issues/payfine", {
        issueId: selectedIssue
      });

      if (response.data.success) {

        alert("Fine paid successfully");

        setSelectedIssue("");
        fetchIssuesWithFine();

      }

    } catch (err) {

      console.error(err);
      setError(err.response?.data?.message || "Fine payment failed");

    } finally {

      setLoading(false);

    }

  };

  const selectedIssueData = issues.find(
    (issue) => issue._id === selectedIssue
  );

  const fineAmount = selectedIssueData?.fineAmount || 0;

  return (
    <div className="page-container">

      <h2 className="page-title">💰 Pay Fine</h2>

      {loading && <p>Loading fine details...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && issues.length === 0 && (
        <p>No pending fines</p>
      )}

      {!loading && issues.length > 0 && (

        <form onSubmit={handlePayFine} className="form">

          <div className="form-group">

            <label>Select Issue</label>

            <select
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
            >

              <option value="">-- Choose Issue --</option>

              {issues.map((issue) => (
                <option key={issue._id} value={issue._id}>
                  {issue.bookId?.title} - Fine: Rs {issue.fineAmount}
                </option>
              ))}

            </select>

          </div>

          {selectedIssue && (
            <div className="form-group">

              <label>Fine Amount</label>

              <p className="highlight">Rs {fineAmount}</p>

            </div>
          )}

          <button
            className="btn"
            disabled={loading || !selectedIssue}
          >
            {loading ? "Processing..." : "Pay Fine"}
          </button>

        </form>

      )}

    </div>
  );
}

export default PayFine;