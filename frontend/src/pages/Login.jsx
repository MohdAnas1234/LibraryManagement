import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../style.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");
    setLoading(true);

    try {

      const response = await API.post("/auth/login", {
        email,
        password
      });

      if (response.data.success) {

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        const role = response.data.user.role;

        if (role === "admin") {
          navigate("/admin-home");
        } else {
          navigate("/user-home");
        }

      }

    } catch (err) {

      setError(err.response?.data?.message || "Invalid email or password");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2 className="login-title">📚 Library Management</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

          </div>

          {error && <p className="error">{error}</p>}

          <button className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;