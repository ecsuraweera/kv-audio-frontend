import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the backend
  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // Fetch users when the component mounts or when `loading` is set to true
  useEffect(() => {
    if (loading) {
      fetchUsers();
    }
  }, [loading]);

  // Handle blocking/unblocking a user
  const handleBlockUser = (email) => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        // Update state directly without refetching
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email ? { ...user, isBlocked: !user.isBlocked } : user
          )
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Users Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-accent text-white">
                <th className="py-2 px-4 border">Profile</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Address</th>
                <th className="py-2 px-6 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-purple-300 hover:text-white">
                  <td className="py-2 px-4 border text-center">
                    <img
                      src={user.profilePicture || "https://via.placeholder.com/50"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.role}</td>
                  <td className="py-2 px-4 border">{user.phone}</td>
                  <td className="py-2 px-4 border">{user.address}</td>
                  <td
                    onClick={() => handleBlockUser(user.email)}
                    className={`py-2 px-4 border cursor-pointer ${
                      user.isBlocked ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
