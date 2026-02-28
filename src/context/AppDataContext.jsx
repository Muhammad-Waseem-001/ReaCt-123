import React, { createContext, useContext, useMemo } from "react";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../api/productsApi";
import { createUser, deleteUser, fetchUsers, updateUser } from "../api/usersApi";
import useCrudManager from "../hooks/useCrudManager";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const products = useCrudManager({
    fetchPage: fetchProducts,
    createRecord: createProduct,
    updateRecord: updateProduct,
    deleteRecord: deleteProduct,
    pageSize: 6,
  });

  const users = useCrudManager({
    fetchPage: fetchUsers,
    createRecord: createUser,
    updateRecord: updateUser,
    deleteRecord: deleteUser,
    pageSize: 5,
  });

  const value = useMemo(
    () => ({
      products,
      users,
    }),
    [products, users]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppDataContext() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppDataContext must be used within AppDataProvider.");
  }

  return context;
}
