import React, { useEffect, useState } from "react";

const initialState = {
  name: "",
  email: "",
  role: "user",
  status: "active",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function UserForm({ busy, initialItem, onCancel, onSubmit }) {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState("");

  const isEditing = Boolean(initialItem?.id);

  useEffect(() => {
    if (!initialItem) {
      setValues(initialState);
      setError("");
      return;
    }

    setValues({
      name: initialItem.name,
      email: initialItem.email,
      role: initialItem.role,
      status: initialItem.status,
    });
    setError("");
  }, [initialItem]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!values.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!emailPattern.test(values.email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");

    await onSubmit({
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      role: values.role,
      status: values.status,
    });

    if (!isEditing) {
      setValues(initialState);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Name
          <input
            className="input"
            name="name"
            onChange={handleChange}
            placeholder="Ayesha Malik"
            type="text"
            value={values.name}
          />
        </label>

        <label>
          Email
          <input
            className="input"
            name="email"
            onChange={handleChange}
            placeholder="ayesha@example.com"
            type="email"
            value={values.email}
          />
        </label>

        <label>
          Role
          <select className="input" name="role" onChange={handleChange} value={values.role}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <label>
          Status
          <select className="input" name="status" onChange={handleChange} value={values.status}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="form-actions">
        <button className="btn btn-primary" disabled={busy} type="submit">
          {busy ? "Saving..." : isEditing ? "Update User" : "Add User"}
        </button>

        {isEditing ? (
          <button className="btn btn-ghost" disabled={busy} onClick={onCancel} type="button">
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
