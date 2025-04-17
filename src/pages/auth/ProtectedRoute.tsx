import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { JSX } from 'react';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-gray-500">
                <LoadingSpinner size={32} />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
