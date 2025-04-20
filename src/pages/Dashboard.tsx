import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-indigo-50 text-secondary px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-primary">Welcome to Pantraqa Dashboard</h1>

            {user ? (
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
                    <p className="text-lg">
                        <span className="font-semibold text-primary">Email:</span> {user.email}
                    </p>
                    <p className="text-lg mt-2">
                        <span className="font-semibold text-accent">Role:</span> {user.role}
                    </p>
                    <div className="mt-6 space-y-4">
                        {/* Links for Admin & Manager */}
                        {(user.role === 'admin' || user.role === 'manager') && (
                            <div className="space-y-2">
                                <Link
                                    to="/add-drink"
                                    className="block px-5 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold shadow hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300"
                                >
                                    Create Drink
                                </Link>
                                <Link
                                    to="/add-storage-location"
                                    className="block px-5 py-2 rounded-md bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold shadow hover:from-teal-700 hover:to-teal-600 transition-all duration-300"
                                >
                                    Create Storage Location
                                </Link>
                            </div>
                        )}

                        {/* Admin only role management */}
                        {user.role === 'admin' && (
                            <div className="space-y-2">
                                <Link
                                    to="/manage-users"
                                    className="block px-5 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
                                >
                                    Manage Users' Roles
                                </Link>
                                <Link
                                    to="/all-users"
                                    className="block px-5 py-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
                                >
                                    All Users
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-red-500">No user is logged in.</p>
            )}
        </div>
    );
};

export default Dashboard;
