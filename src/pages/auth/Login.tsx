import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import AuthLayout from '../../components/UI/AuthLayout';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/axios';
import axios from 'axios';
import toast from 'react-hot-toast';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.user, res.data.token);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || 'Login failed');
                toast.error(err.response?.data?.error || 'Login failed');
            } else {
                setError('An unexpected error occurred');
                toast.error('Login failed');
            }
        }
    };

    return (
        <AuthLayout>
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-secondary">Login to Pantraqa</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-700 text-white rounded font-semibold hover:bg-blue-400 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-accent hover:underline font-medium">
                        Register here
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}

export default Login;
