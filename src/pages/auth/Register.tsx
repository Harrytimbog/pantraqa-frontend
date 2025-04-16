import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../../components/UI/AuthLayout';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('manager');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/register', {
                email,
                password,
                role,
            });

            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || 'Registration failed');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <AuthLayout>
            <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-secondary">Register to Pantraqa</h2>

                <form onSubmit={handleRegister} className="space-y-4">
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

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                        <option value="manager">Manager</option>
                        <option value="staff">Staff</option>
                    </select>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 bg-teal-700 text-white rounded font-semibold hover:bg-teal-300 hover:text-teal-700 transition-colors"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                        Login here
                    </Link>
                </p>
            </div>
        </AuthLayout>

    );
}

export default Register;
