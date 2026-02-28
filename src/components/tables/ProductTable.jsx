import React from "react";
import TableMessageRow from "../TableMessageRow";
import { formatCurrency } from "../../utils/formatters";

export default function ProductTable({ busy, items, loading, onDelete, onEdit }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? <TableMessageRow colSpan={7} message="Loading products..." /> : null}

          {!loading && items.length === 0 ? (
            <TableMessageRow colSpan={7} message="No products matched your search." />
          ) : null}

          {!loading
            ? items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>{item.stock}</td>
                  <td>
                    <span className={`badge ${item.status}`}>{item.status}</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn btn-ghost"
                        disabled={busy}
                        onClick={() => onEdit(item)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        disabled={busy}
                        onClick={() => onDelete(item.id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
