import React from "react";
import TableMessageRow from "../TableMessageRow";

export default function UserTable({ busy, items, loading, onDelete, onEdit }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? <TableMessageRow colSpan={6} message="Loading users..." /> : null}

          {!loading && items.length === 0 ? (
            <TableMessageRow colSpan={6} message="No users matched your search." />
          ) : null}

          {!loading
            ? items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <span className={`badge ${item.role}`}>{item.role}</span>
                  </td>
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
