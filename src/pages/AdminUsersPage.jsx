import React, { useState } from "react";
import Pagination from "../components/Pagination";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import UserForm from "../components/forms/UserForm";
import UserTable from "../components/tables/UserTable";
import { useUsersData } from "../hooks/useAppData";

export default function AdminUsersPage() {
  const {
    items,
    loading,
    mutating,
    page,
    totalPages,
    totalItems,
    searchTerm,
    error,
    setPage,
    setSearchTerm,
    createItem,
    updateItem,
    deleteItem,
  } = useUsersData();

  const [editingUser, setEditingUser] = useState(null);

  const handleSubmit = async (payload) => {
    if (editingUser) {
      await updateItem(editingUser.id, payload);
      setEditingUser(null);
      return;
    }

    await createItem(payload);
  };

  const handleDelete = async (id) => {
    if (editingUser?.id === id) {
      setEditingUser(null);
    }

    await deleteItem(id);
  };

  return (
    <section className="page-grid">
      <article className="panel">
        <PageHeader
          actions={<span className="pill">Admin Only Route</span>}
          kicker="Admin"
          subtitle="Manage user role and status with full CRUD controls."
          title="User Management"
        />

        <UserForm
          busy={mutating}
          initialItem={editingUser}
          onCancel={() => setEditingUser(null)}
          onSubmit={handleSubmit}
        />

        {error ? <p className="error-text">{error}</p> : null}
      </article>

      <article className="panel">
        <div className="table-toolbar">
          <div>
            <h3>User Records</h3>
            <p className="muted">{totalItems} users</p>
          </div>

          <SearchBar
            onChange={setSearchTerm}
            placeholder="Search by name, email, role..."
            value={searchTerm}
          />
        </div>

        <UserTable
          busy={mutating}
          items={items}
          loading={loading}
          onDelete={handleDelete}
          onEdit={setEditingUser}
        />

        <Pagination onPageChange={setPage} page={page} totalPages={totalPages} />
      </article>
    </section>
  );
}
