import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import PageLoader from '../pages/PageLoader';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isStockDropdownOpen, setIsStockDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleStockDropdown = () => {
        setIsStockDropdownOpen((prev) => !prev);
    };

    // Hooks first
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsStockDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    // New: Lock scroll when mobile menu open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMenuOpen]);

    if (loading) {
        return <PageLoader message="Loading Pantraqa" />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-indigo-50">
            <header className="flex justify-between items-center p-4 bg-transparent z-50 relative">
                <Link to="/" className="text-2xl font-bold text-primary tracking-wide">
                    <img
                        src="/images/logo.png"
                        alt="Pantraqa"
                        className="h-15 w-auto"
                        loading="lazy"
                    />
                </Link>

                {/* Hamburger */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden text-3xl text-primary z-50 transition transform active:scale-90 duration-200"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Backdrop */}
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300"
                        onClick={toggleMenu}
                    ></div>
                )}

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex lg:space-x-4">
                    {!user ? (
                        <Link
                            to="/login"
                            className="px-5 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:from-purple-700 hover:to-pink-600 transition transform active:scale-95 duration-200"
                        >
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/dashboard"
                                className="text-indigo-600 font-semibold hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-500 hover:text-white px-4 py-2 transition transform active:scale-95 duration-200"
                            >
                                Dashboard
                            </Link>

                            {/* Stock Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleStockDropdown}
                                    className="text-indigo-600 font-semibold px-4 py-2 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-500 hover:text-white transition transform active:scale-95 duration-200 flex items-center"
                                >
                                    Manage Stock <FaChevronDown className="ml-2" />
                                </button>
                                {isStockDropdownOpen && (
                                    <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-48 animate-fade-slide-down">
                                        <Link
                                            to="/stocks"
                                            className="block px-5 py-2 text-indigo-600 font-semibold hover:bg-indigo-100 transition transform active:scale-95 duration-200"
                                        >
                                            Available Stocks
                                        </Link>
                                        <Link
                                            to="/stocks-in"
                                            className="block px-5 py-2 text-indigo-600 font-semibold hover:bg-indigo-100 transition transform active:scale-95 duration-200"
                                        >
                                            Stock In
                                        </Link>
                                        <Link
                                            to="/stocks-out"
                                            className="block px-5 py-2 text-indigo-600 font-semibold hover:bg-indigo-100 transition transform active:scale-95 duration-200"
                                        >
                                            Stock Out
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link
                                to="/stocks-logs"
                                className="text-indigo-600 font-semibold hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-500 hover:text-white px-4 py-2 transition transform active:scale-95 duration-200"
                            >
                                Stock Logs
                            </Link>

                            {(user.role === 'admin' || user.role === 'manager') && (
                                <Link
                                    to="/add-drink"
                                    className="text-indigo-600 font-semibold hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-500 hover:text-white px-4 py-2 transition transform active:scale-95 duration-200"
                                >
                                    Add Drink
                                </Link>
                            )}

                            <Link
                                to="/drinks"
                                className="text-teal-600 font-semibold hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-500 hover:text-white px-4 py-2 transition transform active:scale-95 duration-200"
                            >
                                All Drinks
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 border border-primary text-primary bg-white hover:bg-indigo-300 hover:text-white font-semibold transition transform active:scale-95 duration-200"
                            >
                                Sign Out
                            </button>
                        </>
                    )}
                </nav>

                {/* Mobile Navigation */}
                <nav
                    className={`
            fixed top-0 right-0 w-64 h-full bg-white shadow-lg pt-20 px-6 flex flex-col space-y-4 z-40 transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
                >
                    {!user ? (
                        <Link
                            to="/login"
                            className="block w-full text-center px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:from-purple-700 hover:to-pink-600 transition transform active:scale-95 duration-200"
                            onClick={toggleMenu}
                        >
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/dashboard"
                                className="block w-full text-center px-4 py-2 text-indigo-600 font-semibold hover:bg-indigo-100 rounded-md transition transform active:scale-95 duration-200"
                                onClick={toggleMenu}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/stocks"
                                className="block w-full text-center px-4 py-2 text-indigo-600 font-semibold hover:bg-indigo-100 rounded-md transition transform active:scale-95 duration-200"
                                onClick={toggleMenu}
                            >
                                Available Stocks
                            </Link>
                            <Link
                                to="/stocks-logs"
                                className="block w-full text-center px-4 py-2 text-indigo-600 font-semibold hover:bg-indigo-100 rounded-md transition transform active:scale-95 duration-200"
                                onClick={toggleMenu}
                            >
                                Stock Logs
                            </Link>
                            <Link
                                to="/stocks-in"
                                className="block w-full text-center px-4 py-2 text-indigo-600 font-semibold hover:bg-indigo-100 rounded-md transition transform active:scale-95 duration-200"
                                onClick={toggleMenu}
                            >
                                Stock In
                            </Link>
                            <Link
                                to="/stocks-out"
                                className="block w-full text-center px-4 py-2 text-indigo-600 font-semibold hover:bg-indigo-100 rounded-md transition transform active:scale-95 duration-200"
                                onClick={toggleMenu}
                            >
                                Stock Out
                            </Link>
                            {(user.role === 'admin' || user.role === 'manager') && (
                                <Link
                                    to="/add-drink"
                                    className="block w-full text-center px-4 py-2 text-indigo-600 font-semibold hover:bg-indigo-100 rounded-md transition transform active:scale-95 duration-200"
                                    onClick={toggleMenu}
                                >
                                    Add Drink
                                </Link>
                            )}
                            <Link
                                to="/drinks"
                                className="block w-full text-center px-4 py-2 text-teal-600 font-semibold hover:bg-teal-100 rounded-md transition transform active:scale-95 duration-200"
                                onClick={toggleMenu}
                            >
                                All Drinks
                            </Link>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                    toggleMenu();
                                }}
                                className="block w-full text-center px-4 py-2 border border-primary text-primary hover:bg-indigo-100 rounded-md font-semibold transition transform active:scale-95 duration-200"
                            >
                                Sign Out
                            </button>
                        </>
                    )}
                </nav>
            </header>

            <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
            <main className="flex-1 bg-transparent">{children}</main>
        </div>
    );
}
