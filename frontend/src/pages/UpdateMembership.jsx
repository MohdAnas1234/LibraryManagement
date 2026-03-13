import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

function UpdateMembership({ users = [], setUsers }) {

  const [selectedUserId, setSelectedUserId] = useState("");
  const [membershipType, setMembershipType] = useState("Active");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const handleSelectUser = (e) => {

    const userId = Number(e.target.value);
    setSelectedUserId(userId);

    const user = users.find((u) => u.id === userId);

    if (user) {
      setMembershipType(user.membership);
      setIsEditing(true);
    }

  };

  const handleUpdateMembership = (e) => {

    e.preventDefault();

    const updatedUsers = users.map((user) =>
      user.id === selectedUserId
        ? { ...user, membership: membershipType }
        : user
    );

    setUsers(updatedUsers);

    alert("Membership updated successfully");

    navigate("/admin-home");

  };

  return (
    <div className="page-container">

      <h2 className="page-title">👤 Update Membership</h2>

      {users.length === 0 ? (

        <p>No users available</p>

      ) : (

        <>
          <div className="form-group">

            <label>Select User</label>

            <select
              value={selectedUserId}
              onChange={handleSelectUser}
            >

              <option value="">-- Choose User --</option>

              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.membership}
                </option>
              ))}

            </select>

          </div>

          {isEditing && (

            <form onSubmit={handleUpdateMembership} className="form">

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

              <button className="btn">
                Update Membership
              </button>

            </form>

          )}

          <div className="membership-list">

            <h3>Current Memberships</h3>

            <table className="table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user.id}>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>{user.membership}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </>
      )}

    </div>
  );
}

export default UpdateMembership;