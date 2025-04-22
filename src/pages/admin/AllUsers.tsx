import { useEffect, useState } from "react";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import PageLoader from "../PageLoader";

interface User {
  id: number;
  email: string;
  name: string;
  role: "staff" | "manager" | "admin";
  password: string;
  createdAt: string;
  updatedAt: string;
}

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Fetch all users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data as User[]);
        setLoading(false);
      } catch (err: unknown) {
        setError("Failed to fetch users");
        if (err instanceof Error) {
          toast.error(err.message || "Failed to fetch users");
        } else {
          toast.error("Failed to fetch users");
        }
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle role change (async)
  const handleRoleChange = async (
    userId: number,
    newRole: "staff" | "manager" | "admin"
  ) => {
    try {
      await api.put(`admin/${userId}/change-userrole`, { role: newRole });
      toast.success("User role updated successfully!");
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to update user role");
      } else {
        toast.error("Failed to update user role");
      }
    }
  };

  // Handle user deletion (async)
  const handleDeleteUser = async (userId: number) => {
    try {
      await api.delete(`/admin/${userId}`);
      toast.success("User deleted successfully!");
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to delete user");
      } else {
        toast.error("Failed to delete user");
      }
    }
  };

  if (loading) return <PageLoader message="Loading Users..." />;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-white to-indigo-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">All Users</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">
                  {user.role !== "admin" && (
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(
                          user.id,
                          e.target.value as "staff" | "manager" | "admin"
                        )
                      }
                      className="px-4 py-2 rounded-md border border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="staff">Staff</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  )}
                  {/* Only show "Delete" for non-admin users */}
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="ml-4 text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link to="/dashboard" className="mt-6 text-primary hover:underline">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default AllUsers;
