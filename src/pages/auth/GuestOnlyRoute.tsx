import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { JSX } from 'react';

const GuestOnlyRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default GuestOnlyRoute;
