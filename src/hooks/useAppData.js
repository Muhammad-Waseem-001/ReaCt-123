import { useAppDataContext } from "../context/AppDataContext";

export function useProductsData() {
  return useAppDataContext().products;
}

export function useUsersData() {
  return useAppDataContext().users;
}
