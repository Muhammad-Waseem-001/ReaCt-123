import React, { useState } from "react";
import Pagination from "../components/Pagination";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import ProductForm from "../components/forms/ProductForm";
import ProductTable from "../components/tables/ProductTable";
import { useProductsData } from "../hooks/useAppData";

export default function ProductsPage() {
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
  } = useProductsData();

  const [editingProduct, setEditingProduct] = useState(null);

  const handleSubmit = async (payload) => {
    if (editingProduct) {
      await updateItem(editingProduct.id, payload);
      setEditingProduct(null);
      return;
    }

    await createItem(payload);
  };

  const handleDelete = async (id) => {
    if (editingProduct?.id === id) {
      setEditingProduct(null);
    }

    await deleteItem(id);
  };

  return (
    <section className="page-grid">
      <article className="panel">
        <PageHeader
          actions={<span className="pill">Mock REST API + Local Storage</span>}
          kicker="Products"
          subtitle="Reusable form and data table with client-side validation."
          title="Product CRUD"
        />

        <ProductForm
          busy={mutating}
          initialItem={editingProduct}
          onCancel={() => setEditingProduct(null)}
          onSubmit={handleSubmit}
        />

        {error ? <p className="error-text">{error}</p> : null}
      </article>

      <article className="panel">
        <div className="table-toolbar">
          <div>
            <h3>Product Records</h3>
            <p className="muted">{totalItems} total items</p>
          </div>

          <SearchBar
            onChange={setSearchTerm}
            placeholder="Search by name, category, status..."
            value={searchTerm}
          />
        </div>

        <ProductTable
          busy={mutating}
          items={items}
          loading={loading}
          onDelete={handleDelete}
          onEdit={setEditingProduct}
        />

        <Pagination onPageChange={setPage} page={page} totalPages={totalPages} />
      </article>
    </section>
  );
}
