"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

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
        setFormData({ email: "", name: "", password: "" });
        alert("Пользователь успешно изменен");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Ошибка при изменении пользователя:", error);
    }
  };

  const startEdit = (user) => {
    setEditingUser(user);
    setFormData({ email: user.email, name: user.name, password: "" });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-medium text-center">
        Редактирование пользователей
      </h2>

      <div className="mt-4">
        <h3 className="text-lg">Список пользователей:</h3>
        <ul className="mt-2">
          {users.map((user) => (
            <li
              key={user._id}
              className="mt-2 p-2 flex items-center gap-4 bg-amber-100 rounded"
            >
              {user.name} ({user.email})
              <button
                onClick={() => startEdit(user)}
                className="bg-amber-200 hover:bg-amber-300"
              >
                Выбрать
              </button>
            </li>
          ))}
        </ul>
      </div>

      {editingUser && (
        <div className="mt-6 p-2 bg-gray-100 rounded">
          <h2>Изменить данные пользователя</h2>
          <form onSubmit={handleUpdate}>
            <div className="mt-2 flex gap-2 items-center">
              <label>Email:</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="p-1 bg-white rounded"
              />
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <label>Имя пользователя:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="p-1 bg-white rounded"
              />
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <label>
                Новый пароль (оставьте поле пустым, чтобы оставить старый без
                изменений):
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="p-1 bg-white rounded"
              />
            </div>
            <div className="mt-2 flex gap-4">
              <button type="submit" className="bg-green-200 hover:bg-green-400">
                Сохранить изменения
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="bg-red-200 hover:bg-red-300"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
