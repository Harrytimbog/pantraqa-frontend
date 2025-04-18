import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    if (loading) return <div>Loading...</div>;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-indigo-50">
            <header className="flex justify-between items-center p-4 bg-transparent z-50 relative">
                <Link to="/" className="text-2xl font-bold text-primary tracking-wide">
                    Pantraqa
                </Link>

                {/* Hamburger Icon for mobile */}
                <button onClick={toggleMenu} className="lg:hidden text-3xl text-primary z-50">
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Mobile menu backdrop */}
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
                        onClick={toggleMenu}
                    ></div>
                )}

                {/* Desktop Navigation - unchanged from original */}
                <nav className="hidden lg:flex lg:space-x-4">
                    {!user ? (
                        <Link
                            to="/login"
                            className="px-5 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
                        >
                            Login
                        </Link>
                    ) : (
                        <>
                            {(user.role === 'admin' || user.role === 'manager') && (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="text-indigo-600 font-semibold hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-500 text-primary hover:text-white px-5 py-2 transition-colors duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/stocks-logs"
                                        className="text-indigo-600 font-semibold hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-500 text-primary hover:text-white px-5 py-2 transition-colors duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        Stock Logs
                                    </Link>
                                    <Link
                                        to="/add-drink"
                                        className="text-indigo-600 font-semibold hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-500 text-primary hover:text-white px-5 py-2 transition-colors duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        Add Drink
                                    </Link>
                                </>
                            )}

                            <Link
                                to="/drinks"
                                className="text-teal-600 font-semibold hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-500 text-primary hover:text-white px-5 py-2 transition-colors duration-300 ease-in-out transform hover:scale-105"
                            >
                                All Drinks
                            </Link>

                            <Link
                                to="/login"
                                onClick={handleLogout}
                                className="px-5 py-2 text-primary border border-primary text-primary bg-white hover:bg-indigo-300 hover:text-white font-semibold transition-all duration-300 shadow"
                            >
                                Sign Out
                            </Link>
                        </>
                    )}
                </nav>

                {/* Mobile Navigation - separate from desktop */}
                <nav className={`
                    ${isMenuOpen ? 'fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col space-y-4 z-40' : 'hidden'}
                `}>
                    {!user ? (
                        <Link
                            to="/login"
                            className="block px-5 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
                            onClick={toggleMenu}
                        >
                            Login
                        </Link>
                    ) : (
                        <>
                            {(user.role === 'admin' || user.role === 'manager') && (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="block px-5 py-2 rounded-md text-indigo-600 font-semibold hover:bg-indigo-100 transition-colors duration-300"
                                        onClick={toggleMenu}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/stocks-logs"
                                        className="block px-5 py-2 rounded-md text-indigo-600 font-semibold hover:bg-indigo-100 transition-colors duration-300"
                                        onClick={toggleMenu}
                                    >
                                        Stock Logs
                                    </Link>
                                    <Link
                                        to="/add-drink"
                                        className="block px-5 py-2 rounded-md text-indigo-600 font-semibold hover:bg-indigo-100 transition-colors duration-300"
                                        onClick={toggleMenu}
                                    >
                                        Add Drink
                                    </Link>
                                </>
                            )}

                            <Link
                                to="/drinks"
                                className="block px-5 py-2 rounded-md text-teal-600 font-semibold hover:bg-teal-100 transition-colors duration-300"
                                onClick={toggleMenu}
                            >
                                All Drinks
                            </Link>

                            <Link
                                to="/login"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                    toggleMenu();
                                }}
                                className="block px-5 py-2 rounded-md border border-primary text-primary hover:bg-indigo-100 font-semibold transition-all duration-300"
                            >
                                Sign Out
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            <main className="bg-transparent">{children}</main>
        </div>
    );
}