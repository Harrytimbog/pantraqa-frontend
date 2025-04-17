import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-secondary px-4">
            <h1 className="text-3xl font-bold mb-4">Welcome to Pantraqa Dashboard</h1>

            {user ? (
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
                    <p className="text-lg">
                        <span className="font-semibold text-primary">Email:</span> {user.email}
                    </p>
                    <p className="text-lg mt-2">
                        <span className="font-semibold text-accent">Role:</span> {user.role}
                    </p>
                </div>
            ) : (
                <p className="text-red-500">No user is logged in.</p>
            )}
        </div>
    );
};

export default Dashboard;
