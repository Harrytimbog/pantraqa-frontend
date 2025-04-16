import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem('token'));

    // Re-check token on route change
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [location.pathname]); // re-check on every route change

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false); // update state manually
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-indigo-50">
            <header className="flex justify-between items-center p-4 bg-transparent z-50">
                <Link to="/" className="text-2xl font-bold text-primary tracking-wide">
                    Pantraqa
                </Link>

                <nav className="space-x-4">
                    {!isLoggedIn ? (
                        <Link
                            to="/login"
                            className="px-5 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
                        >
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 rounded-md border border-primary text-primary bg-white hover:bg-indigo-300 hover:text-white font-semibold transition-all duration-300 shadow"                        >
                            Sign Out
                        </button>
                    )}
                </nav>
            </header>

            <main className="bg-transparent">{children}</main>
        </div>
    );
}
