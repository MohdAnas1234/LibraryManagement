import React, { useState, useEffect } from "react";
import API from "../api";
import "../style.css";

function Reports() {

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {

    try {

      const response = await API.get("/issues/report");

      if (response.data.success) {
        setReport(response.data.report || {});
      }

    } catch (err) {

      console.error(err);
      setError("Unable to load report");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="page-container">

      <h2 className="page-title">📊 Library Reports</h2>

      {loading && <p>Loading report...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && report && (

        <div className="report-container">

          <div className="report-card">
            <h3>Total Issued</h3>
            <p className="report-value">{report.totalIssued || 0}</p>
          </div>

          <div className="report-card">
            <h3>Returned Books</h3>
            <p className="report-value">{report.totalReturned || 0}</p>
          </div>

          <div className="report-card">
            <h3>Active Issues</h3>
            <p className="report-value">{report.activeIssues || 0}</p>
          </div>

          <div className="report-card">
            <h3>Overdue Issues</h3>
            <p className="report-value">{report.overdueIssues || 0}</p>
          </div>

          <div className="report-card">
            <h3>Total Fines (Rs)</h3>
            <p className="report-value">{report.totalFines || 0}</p>
          </div>

        </div>

      )}

      {!loading && !report && (
        <p>No report data available</p>
      )}

    </div>
  );
}

export default Reports;