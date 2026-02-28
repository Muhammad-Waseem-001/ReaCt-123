import {
  createId,
  normalizeQuery,
  paginate,
  readCollection,
  wait,
  writeCollection,
} from "./storage";

const STORAGE_KEY = "role_dashboard_users_v2";

const seedUsers = [
  { id: 1, name: "Ayaan Malik", email: "ayaan@example.com", role: "admin", status: "active" },
  { id: 2, name: "Sara Khan", email: "sara@example.com", role: "user", status: "active" },
  { id: 3, name: "Noah Ahmed", email: "noah@example.com", role: "user", status: "inactive" },
  { id: 4, name: "Maya Iqbal", email: "maya@example.com", role: "user", status: "active" },
  { id: 5, name: "Ali Raza", email: "ali@example.com", role: "admin", status: "active" },
  { id: 6, name: "Hina Saeed", email: "hina@example.com", role: "user", status: "active" },
  { id: 7, name: "Zain Hasan", email: "zain@example.com", role: "user", status: "inactive" },
  { id: 8, name: "Emaan Waheed", email: "emaan@example.com", role: "user", status: "active" },
  { id: 9, name: "Hammad Saleem", email: "hammad@example.com", role: "user", status: "active" },
  { id: 10, name: "Fatima Noor", email: "fatima@example.com", role: "user", status: "active" },
];

function searchableText(user) {
  return [user.name, user.email, user.role, user.status].join(" ").toLowerCase();
}

export async function fetchUsers({ search = "", page = 1, pageSize = 5 }) {
  await wait();

  const query = normalizeQuery(search);
  const users = readCollection(STORAGE_KEY, seedUsers);
  const filtered = query ? users.filter((user) => searchableText(user).includes(query)) : users;

  return paginate(filtered, page, pageSize);
}

export async function createUser(payload) {
  await wait();

  const users = readCollection(STORAGE_KEY, seedUsers);
  const normalizedEmail = payload.email.trim().toLowerCase();
  const duplicate = users.find((user) => user.email.toLowerCase() === normalizedEmail);

  if (duplicate) {
    throw new Error("Email already exists.");
  }

  const newUser = {
    id: createId(users),
    ...payload,
    email: normalizedEmail,
  };

  writeCollection(STORAGE_KEY, [newUser, ...users]);
  return newUser;
}

export async function updateUser(id, payload) {
  await wait();

  const users = readCollection(STORAGE_KEY, seedUsers);
  const numericId = Number(id);
  const normalizedEmail = payload.email.trim().toLowerCase();

  const duplicate = users.find(
    (user) => user.id !== numericId && user.email.toLowerCase() === normalizedEmail
  );

  if (duplicate) {
    throw new Error("Email already exists.");
  }

  const updatedUsers = users.map((user) =>
    user.id === numericId ? { ...user, ...payload, email: normalizedEmail } : user
  );

  writeCollection(STORAGE_KEY, updatedUsers);
  return updatedUsers.find((user) => user.id === numericId) || null;
}

export async function deleteUser(id) {
  await wait();

  const numericId = Number(id);
  const users = readCollection(STORAGE_KEY, seedUsers);
  const filteredUsers = users.filter((user) => user.id !== numericId);
  writeCollection(STORAGE_KEY, filteredUsers);
}

export async function fetchUserSummary() {
  await wait(120);

  const users = readCollection(STORAGE_KEY, seedUsers);
  const activeUsers = users.filter((user) => user.status === "active").length;
  const adminUsers = users.filter((user) => user.role === "admin").length;

  return {
    totalUsers: users.length,
    activeUsers,
    adminUsers,
  };
}
