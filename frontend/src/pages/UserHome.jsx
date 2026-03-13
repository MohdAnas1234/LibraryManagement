import React from "react";
import { Link } from "react-router-dom";
import "../style.css";

function UserHome() {

  const dashboardItems = [
    {
      title: "Search Book",
      path: "/search-book",
      desc: "Find books in the library"
    },
    {
      title: "Active Issues",
      path: "/active-issues",
      desc: "Check your borrowed books"
    },
    {
      title: "Return Book",
      path: "/return-book",
      desc: "Return borrowed books"
    },
    {
      title: "Pay Fine",
      path: "/pay-fine",
      desc: "Pay pending fines"
    }
  ];

  return (
    <div className="home-container">

      <h2 className="dashboard-title">📚 User Dashboard</h2>

      <div className="dashboard-grid">

        {dashboardItems.map((item, index) => (
          <Link key={index} to={item.path} className="dashboard-card">

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </Link>
        ))}

      </div>

    </div>
  );
}

export default UserHome;