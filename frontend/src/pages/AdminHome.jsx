import React from "react";
import { Link } from "react-router-dom";
import "../style.css";

function AdminHome() {

  const dashboardItems = [
    {
      title: "Add Book",
      path: "/add-book",
      desc: "Add new books to the library"
    },
    {
      title: "Update Book",
      path: "/update-book",
      desc: "Update existing book details"
    },
    {
      title: "User Management",
      path: "/user-management",
      desc: "Add, update or remove users"
    },
    {
      title: "Add Membership",
      path: "/add-membership",
      desc: "Register memberships"
    },
    {
      title: "Update Membership",
      path: "/update-membership",
      desc: "Modify membership details"
    },
    {
      title: "Active Issues",
      path: "/active-issues",
      desc: "View issued books"
    },
    {
      title: "Overdue Returns",
      path: "/overdue-returns",
      desc: "Check overdue books"
    },
    {
      title: "Reports",
      path: "/reports",
      desc: "Library reports"
    }
  ];

  return (
    <div className="home-container">

      <h1 className="dashboard-title">📚 Admin Dashboard</h1>

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

export default AdminHome;