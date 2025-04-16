import { useNavigate } from 'react-router-dom';

export default function GetStartedButton() {
    const navigate = useNavigate();
    const isAuthenticated = Boolean(localStorage.getItem('token')); // Or use auth context

    const handleClick = () => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <button
            onClick={handleClick}
            className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
        >
            Get Started
        </button>
    );
}
