import Navbar from "../components/Navbar";

const AdminPanel = () => (
  <>
    <Navbar />
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>
      <p>Only visible to admins.</p>
    </div>
  </>
);

export default AdminPanel;