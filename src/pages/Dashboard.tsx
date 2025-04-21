import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const { user } = useAuth();
    const [welcomeMessage, setWelcomeMessage] = useState("Welcome to Pantraqa");

    useEffect(() => {
        if (user?.name) {
            const messages = [
                `Believe the hype, you're awesome ${user.name}!`,
                `You're doing a great job ${user.name}!`,
                `Your efforts are appreciated ${user.name}!`,
                `Making magic happen ${user.name}!`,
                `Pantraqa's MVP ${user.name}!`,
                `Today's beverage hero ${user.name}!`,
                `${user.name}, our inventory wizard!`,
                `Cheers to you ${user.name}!`,
                `Ready to stock some drinks, ${user.name}?`,
                `${user.name} on duty! Let's do this!`
            ];
            setWelcomeMessage(messages[Math.floor(Math.random() * messages.length)]);
        }
    }, [user?.name]);

    // Function to format role display
    const formatRole = (role: string) => {
        if (role === 'staff') return 'RUNNER';
        return role.toUpperCase();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-indigo-50 px-4 py-10">
            <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-4xl font-bold text-primary mb-2">
                    {welcomeMessage}
                </h1>
            </div>

            {user ? (
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-indigo-100 animate-pop-in">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm">
                                <span className="text-indigo-600 font-bold text-lg">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                                <p className="text-sm text-indigo-500 font-medium">
                                    {formatRole(user.role)}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2 text-left pl-2">
                            <p className="flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 space-y-3">
                        {(user.role === 'admin' || user.role === 'manager') && (
                            <Link
                                to="/add-storage-location"
                                className="flex items-center justify-center space-x-2 px-5 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-400 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Create Storage Location</span>
                            </Link>
                        )}

                        {user.role === 'admin' && (
                            <Link
                                to="/all-users"
                                className="flex items-center justify-center space-x-2 px-5 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span>Manage Users</span>
                            </Link>
                        )}

                        {user.role === 'staff' && (
                            <Link
                                to="/stocks"
                                className="flex items-center justify-center space-x-2 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span>View Stocks</span>
                            </Link>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-xl shadow-md text-center animate-pop-in">
                    <p className="text-red-400 flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>No user logged in</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;