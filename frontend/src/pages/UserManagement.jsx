import React, { useState } from "react";
import "../style.css";

function UserManagement({ users = [], setUsers }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setSelectedUserId("");
    setIsEditing(false);
  };

  const handleAddUser = (e) => {

    e.preventDefault();

    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    const newUser = {
      id: Date.now(), // safer unique ID
      name,
      email,
      membership: "Active"
    };

    setUsers([...users, newUser]);

    alert("User added successfully");

    resetForm();

  };

  const handleSelectUser = (e) => {

    const userId = Number(e.target.value);
    setSelectedUserId(userId);

    const user = users.find((u) => u.id === userId);

    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsEditing(true);
    }

  };

  const handleUpdateUser = (e) => {

    e.preventDefault();

    const updatedUsers = users.map((user) =>
      user.id === selectedUserId
        ? { ...user, name, email }
        : user
    );

    setUsers(updatedUsers);

    alert("User updated successfully");

    resetForm();

  };

  const handleDeleteUser = () => {

    if (!selectedUserId) return;

    if (window.confirm("Are you sure you want to delete this user?")) {

      const filteredUsers = users.filter(
        (user) => user.id !== selectedUserId
      );

      setUsers(filteredUsers);

      alert("User deleted successfully");

      resetForm();

    }

  };

  return (
    <div className="page-container">

      <h2 className="page-title">👤 User Management</h2>

      {/* Add User */}

      <div className="management-section">

        <h3>Add User</h3>

        <form onSubmit={handleAddUser} className="form">

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="btn">Add User</button>

        </form>

      </div>

      {/* Edit User */}

      <div className="management-section">

        <h3>Edit / Delete User</h3>

        <div className="form-group">

          <label>Select User</label>

          <select
            value={selectedUserId}
            onChange={handleSelectUser}
          >

            <option value="">-- Choose User --</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}

          </select>

        </div>

        {isEditing && (

          <form onSubmit={handleUpdateUser} className="form">

            <div className="form-group">

              <label>Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            <div className="button-group">

              <button className="btn">
                Update User
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteUser}
              >
                Delete
              </button>

            </div>

          </form>

        )}

      </div>

      {/* User List */}

      <div className="user-list">

        <h3>All Users</h3>

        {users.length === 0 ? (

          <p>No users available</p>

        ) : (

          <table className="table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Membership</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (

                <tr key={user.id}>

                  <td>{user.id}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.membership}</td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default UserManagement;