// src/components/StockForm.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/axios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Drink {
    id: number;
    name: string;
    size: string;
}

interface Location {
    id: number;
    name: string;
    type: string;
}

interface Props {
    action: 'in' | 'out';
    onSubmitSuccess?: () => void;
}

const StockForm = ({ action, onSubmitSuccess }: Props) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [drinkId, setDrinkId] = useState('');
    const [storageLocationId, setStorageLocationId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [drinksRes, locationsRes] = await Promise.all([
                    api.get('/drinks'),
                    api.get('/storage-locations'),
                ]);
                // console.log(drinksRes.data, locationsRes.data);
                setDrinks(drinksRes.data.drinks);
                setLocations(locationsRes.data.locations);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch options', err);
                setLoading(false);
            }
        };
        fetchOptions();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(`/stocks/${action}`, {
                drinkId: Number(drinkId),
                storageLocationId: Number(storageLocationId),
                quantity: Number(quantity),
            });
            toast.success('Stock updated successfully!');
            setDrinkId('');
            setStorageLocationId('');
            setQuantity('');

            if (onSubmitSuccess) {
                onSubmitSuccess();
            } else {
                navigate('/stocks'); // ✅ Default redirect
            }

        } catch (err: unknown) {
            console.error('Full error:', err);
            toast.error('Failed to update stock.');
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.error || err.message || 'Stock update failed';
                console.error('Axios Error:', message);
                setError(message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    if (!user || (user.role !== 'manager' && user.role !== 'admin')) {
        return <p className="text-red-600">You do not have permission to perform this action.</p>;
    }

    if (loading) return <p className="text-gray-500">Loading options...</p>;

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow p-6 rounded space-y-4">
            <h2 className="text-lg font-bold text-secondary">Stock {action === 'in' ? 'In' : 'Out'} Form</h2>

            <select
                value={drinkId}
                onChange={(e) => setDrinkId(e.target.value)}
                required
                className="w-full p-3 border rounded focus:ring-2 focus:ring-accent"
                autoFocus
            >
                <option value="">Select Drink</option>
                {drinks.map((drink) => (
                    <option key={drink.id} value={drink.id}>
                        {drink.name} ({drink.size})
                    </option>
                ))}
            </select>

            <select
                value={storageLocationId}
                onChange={(e) => setStorageLocationId(e.target.value)}
                required
                className="w-full p-3 border rounded focus:ring-2 focus:ring-accent"
            >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                        {loc.name} ({loc.type})
                    </option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full p-3 border rounded focus:ring-2 focus:ring-accent"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded hover:bg-blue-300 transition">
                Submit
            </button>
        </form>
    );
};

export default StockForm;
