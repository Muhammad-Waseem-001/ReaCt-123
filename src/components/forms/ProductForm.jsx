import React, { useEffect, useState } from "react";

const initialState = {
  name: "",
  category: "",
  price: "",
  stock: "",
  status: "active",
};

export default function ProductForm({ busy, initialItem, onCancel, onSubmit }) {
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
      category: initialItem.category,
      price: String(initialItem.price),
      stock: String(initialItem.stock),
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
    const price = Number(values.price);
    const stock = Number(values.stock);

    if (!values.name.trim() || !values.category.trim()) {
      setError("Name and category are required.");
      return;
    }

    if (Number.isNaN(price) || Number.isNaN(stock) || price < 0 || stock < 0) {
      setError("Price and stock must be valid numbers greater than or equal to zero.");
      return;
    }

    setError("");
    await onSubmit({
      name: values.name.trim(),
      category: values.category.trim(),
      price,
      stock,
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
            placeholder="Wireless Speaker"
            type="text"
            value={values.name}
          />
        </label>

        <label>
          Category
          <input
            className="input"
            name="category"
            onChange={handleChange}
            placeholder="Audio"
            type="text"
            value={values.category}
          />
        </label>

        <label>
          Price
          <input
            className="input"
            min="0"
            name="price"
            onChange={handleChange}
            step="0.01"
            type="number"
            value={values.price}
          />
        </label>

        <label>
          Stock
          <input
            className="input"
            min="0"
            name="stock"
            onChange={handleChange}
            type="number"
            value={values.stock}
          />
        </label>

        <label>
          Status
          <select className="input" name="status" onChange={handleChange} value={values.status}>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </label>
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="form-actions">
        <button className="btn btn-primary" disabled={busy} type="submit">
          {busy ? "Saving..." : isEditing ? "Update Product" : "Add Product"}
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
