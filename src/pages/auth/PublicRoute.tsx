import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();

    return user ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default PublicRoute;