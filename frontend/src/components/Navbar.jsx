import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../style.css";

function Navbar({ user }) {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {

    if (window.confirm("Are you sure you want to logout?")) {
      navigate("/logout");
    }

  };

  // Hide navbar on login page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* Logo */}

        <Link
          to={user?.role === "admin" ? "/admin-home" : "/user-home"}
          className="navbar-brand"
        >
          📚 Library System
        </Link>

        {/* Right side menu */}

        <div className="navbar-menu">

          {user && (

            <>
              <span className="navbar-user">

                {user.role === "admin" ? "👤 Admin" : "👤 User"}  
                {" "}
                {user.name}

              </span>

              <button
                onClick={handleLogout}
                className="navbar-logout"
              >
                Logout
              </button>
            </>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;