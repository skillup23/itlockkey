"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Загрузка списка пользователей
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await fetch(`/api/users/${editingUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Обновляем локальное состояние
        setUsers(
          users.map((user) =>
            user._id === editingUser._id ? result.user : user
          )
        );
        setEditingUser(null);
        setFormData({ email: "", password: "" });
        alert("User updated successfully");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const startEdit = (user) => {
    setEditingUser(user);
    setFormData({ email: user.email, password: "" });
  };

  return (
    <div>
      <h1>User Management</h1>

      <div>
        <h2>Users List</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} ({user.email})
              <button onClick={() => startEdit(user)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>

      {editingUser && (
        <div>
          <h2>Edit User</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Email:</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>New Password (leave blank to keep current):</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <button type="submit">Update User</button>
            <button type="button" onClick={() => setEditingUser(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
