import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

function AddMembership({ users = [], setUsers }) {

  const navigate = useNavigate();

  const [selectedUserId, setSelectedUserId] = useState("");
  const [membershipType, setMembershipType] = useState("Active");
  const [error, setError] = useState("");

  const handleAddMembership = (e) => {

    e.preventDefault();
    setError("");

    if (!selectedUserId) {
      setError("Please select a user");
      return;
    }

    const updatedUsers = users.map((user) =>
      user.id === Number(selectedUserId)
        ? { ...user, membership: membershipType }
        : user
    );

    setUsers(updatedUsers);

    alert("Membership added successfully!");

    navigate("/admin-home");

  };

  return (
    <div className="page-container">

      <div className="card">

        <h2 className="page-title">👥 Add Membership</h2>

        <form onSubmit={handleAddMembership} className="form">

          <div className="form-group">
            <label>Select User</label>

            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >

              <option value="">-- Select a user --</option>

              {users.length > 0 ? (
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))
              ) : (
                <option disabled>No users available</option>
              )}

            </select>
          </div>

          <div className="form-group">

            <label>Membership Status</label>

            <select
              value={membershipType}
              onChange={(e) => setMembershipType(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>

          </div>

          {error && <p className="error">{error}</p>}

          <button className="btn">
            Add Membership
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddMembership;