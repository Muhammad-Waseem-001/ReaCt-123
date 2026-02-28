import {
  createId,
  normalizeQuery,
  paginate,
  readCollection,
  wait,
  writeCollection,
} from "./storage";

const STORAGE_KEY = "role_dashboard_products_v2";

const seedProducts = [
  { id: 1, name: "Pulse Headphones", category: "Audio", price: 149.99, stock: 22, status: "active" },
  { id: 2, name: "Nova Smartwatch", category: "Wearables", price: 239, stock: 15, status: "active" },
  { id: 3, name: "Glow RGB Keyboard", category: "Accessories", price: 89.5, stock: 42, status: "draft" },
  { id: 4, name: "Aero Laptop Stand", category: "Office", price: 56, stock: 8, status: "active" },
  { id: 5, name: "Zen USB-C Hub", category: "Accessories", price: 69.99, stock: 31, status: "archived" },
  { id: 6, name: "Nimbus Camera", category: "Photography", price: 520, stock: 4, status: "active" },
  { id: 7, name: "Orbit Portable SSD", category: "Storage", price: 134, stock: 28, status: "active" },
  { id: 8, name: "Echo Conference Mic", category: "Audio", price: 210, stock: 10, status: "draft" },
  { id: 9, name: "Titan 4K Monitor", category: "Display", price: 329, stock: 12, status: "active" },
  { id: 10, name: "Flow Mechanical Mouse", category: "Accessories", price: 79, stock: 19, status: "active" },
  { id: 11, name: "Core Mini Projector", category: "Display", price: 289, stock: 6, status: "draft" },
  { id: 12, name: "Ultra Dock Pro", category: "Office", price: 199, stock: 9, status: "active" },
];

function searchableText(product) {
  return [product.name, product.category, product.status, String(product.price), String(product.stock)]
    .join(" ")
    .toLowerCase();
}

export async function fetchProducts({ search = "", page = 1, pageSize = 6 }) {
  await wait();

  const query = normalizeQuery(search);
  const products = readCollection(STORAGE_KEY, seedProducts);
  const filtered = query ? products.filter((product) => searchableText(product).includes(query)) : products;

  return paginate(filtered, page, pageSize);
}

export async function createProduct(payload) {
  await wait();

  const products = readCollection(STORAGE_KEY, seedProducts);
  const newProduct = {
    id: createId(products),
    ...payload,
  };

  writeCollection(STORAGE_KEY, [newProduct, ...products]);
  return newProduct;
}

export async function updateProduct(id, payload) {
  await wait();

  const numericId = Number(id);
  const products = readCollection(STORAGE_KEY, seedProducts);
  const updatedProducts = products.map((product) =>
    product.id === numericId ? { ...product, ...payload } : product
  );

  writeCollection(STORAGE_KEY, updatedProducts);
  return updatedProducts.find((product) => product.id === numericId) || null;
}

export async function deleteProduct(id) {
  await wait();

  const numericId = Number(id);
  const products = readCollection(STORAGE_KEY, seedProducts);
  const filteredProducts = products.filter((product) => product.id !== numericId);
  writeCollection(STORAGE_KEY, filteredProducts);
}

export async function fetchProductSummary() {
  await wait(120);

  const products = readCollection(STORAGE_KEY, seedProducts);
  const activeProducts = products.filter((product) => product.status === "active").length;
  const lowStockProducts = products.filter((product) => product.stock <= 10).length;

  return {
    totalProducts: products.length,
    activeProducts,
    lowStockProducts,
  };
}
