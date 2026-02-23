let users = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "user" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "user" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "admin" },
  { id: 4, name: "David", email: "david@example.com", role: "user" },
];

export const getUsers = () => [...users];

export const createUser = (user) => {
  const id = users.length + 1;
  const newUser = { id, ...user };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id, updatedUser) => {
  users = users.map((u) => (u.id === id ? { ...u, ...updatedUser } : u));
  return users.find((u) => u.id === id);
};

export const deleteUser = (id) => {
  users = users.filter((u) => u.id !== id);
};