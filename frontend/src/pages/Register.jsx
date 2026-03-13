import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await API.post("/auth/register",{
        name,
        email,
        password,
        role:"user"
      });

      alert("Registration successful");

      navigate("/");

    } catch(err){
      alert("Registration failed");
    }

  };

  return (
    <div className="login-container">

      <h2>User Registration</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

      </form>

    </div>
  );
}

export default Register;