import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { JSX } from 'react';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    // Show the loading spinner while loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-gray-500">
                <LoadingSpinner size={32} />
            </div>
        );
    }

    // If no user is logged in, redirect to the login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Return the protected content if the user is logged in
    return children;
};

export default ProtectedRoute;
