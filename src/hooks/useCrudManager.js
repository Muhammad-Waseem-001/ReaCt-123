import { useCallback, useEffect, useMemo, useState } from "react";

function toMessage(error, fallbackMessage) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

export default function useCrudManager({
  fetchPage,
  createRecord,
  updateRecord,
  deleteRecord,
  pageSize,
}) {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(
    async (targetPage = page, targetSearch = searchTerm) => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchPage({
          page: targetPage,
          pageSize,
          search: targetSearch,
        });

        setItems(response.items);
        setTotalItems(response.totalItems);
        setTotalPages(response.totalPages);
        setPage(response.page);
      } catch (error) {
        setError(toMessage(error, "Unable to fetch records. Please try again."));
      } finally {
        setLoading(false);
      }
    },
    [fetchPage, page, pageSize, searchTerm]
  );

  useEffect(() => {
    load(page, searchTerm);
  }, [load, page, searchTerm]);

  const updateSearch = useCallback((value) => {
    setSearchTerm(value);
    setPage(1);
  }, []);

  const createItem = useCallback(
    async (payload) => {
      setMutating(true);
      setError("");

      try {
        await createRecord(payload);
        await load(1, searchTerm);
        setPage(1);
      } catch (error) {
        setError(toMessage(error, "Unable to create record."));
      } finally {
        setMutating(false);
      }
    },
    [createRecord, load, searchTerm]
  );

  const updateItem = useCallback(
    async (id, payload) => {
      setMutating(true);
      setError("");

      try {
        await updateRecord(id, payload);
        await load(page, searchTerm);
      } catch (error) {
        setError(toMessage(error, "Unable to update record."));
      } finally {
        setMutating(false);
      }
    },
    [load, page, searchTerm, updateRecord]
  );

  const deleteItem = useCallback(
    async (id) => {
      setMutating(true);
      setError("");

      try {
        await deleteRecord(id);
        await load(page, searchTerm);
      } catch (error) {
        setError(toMessage(error, "Unable to delete record."));
      } finally {
        setMutating(false);
      }
    },
    [deleteRecord, load, page, searchTerm]
  );

  return useMemo(
    () => ({
      items,
      page,
      pageSize,
      totalPages,
      totalItems,
      searchTerm,
      loading,
      mutating,
      error,
      setPage,
      setSearchTerm: updateSearch,
      createItem,
      updateItem,
      deleteItem,
      reload: () => load(page, searchTerm),
    }),
    [
      createItem,
      deleteItem,
      error,
      items,
      load,
      loading,
      mutating,
      page,
      pageSize,
      searchTerm,
      totalItems,
      totalPages,
      updateItem,
      updateSearch,
    ]
  );
}
