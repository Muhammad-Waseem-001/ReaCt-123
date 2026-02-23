import Navbar from "../components/Navbar";
import { getUsers, createUser, deleteUser } from "../api/api";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const Users = () => {
  const { isLoaded } = useUser();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 2;

  useEffect(() => {
    if (isLoaded) setUsers(getUsers());
  }, [isLoaded]);

  if (!isLoaded) return <div>Loading users...</div>;

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id) => {
    deleteUser(id);
    setUsers(getUsers());
  };

  const handleAdd = () => {
    const name = prompt("Enter name:");
    const email = prompt("Enter email:");
    if (name && email) {
      createUser({ name, email, role: "user" });
      setUsers(getUsers());
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>Users</h1>
        <button onClick={handleAdd}>Add User</button>
        <input
          style={{ marginLeft: "20px" }}
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <ul>
          {paginated.map((u) => (
            <li key={u.id} style={{ margin: "10px 0" }}>
              {u.name} ({u.email}) [{u.role}]
              <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(u.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "10px" }}>
          Page: {page} / {totalPages}
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ marginLeft: "10px" }}>
            Prev
          </button>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} style={{ marginLeft: "5px" }}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Users;