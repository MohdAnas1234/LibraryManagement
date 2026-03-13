import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage and redirect after 2 seconds
    const timer = setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="logout-container">
      <div className="logout-box">
        <h1>Logged Out</h1>
        <p>You have been successfully logged out.</p>
        <p>Redirecting to login page...</p>
      </div>
    </div>
  );
}

export default Logout;
