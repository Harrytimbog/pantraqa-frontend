import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import toast from 'react-hot-toast';
import { Drink } from '../../types';
import BackgroundIcons from '../../components/BackgroundIcons';

const AllDrinks = () => {
    const [drinks, setDrinks] = useState<Drink[]>([]);

    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const response = await api.get('/drinks');
                setDrinks(response.data.drinks);
            } catch (error) {
                toast.error((error instanceof Error ? error.message : 'Error fetching drinks!'));
            }
        };
        fetchDrinks();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/drinks/${id}`);
            setDrinks(drinks.filter((drink: Drink) => drink.id !== id));
            toast.success('Drink deleted successfully!');
        } catch (error) {
            toast.error((error instanceof Error ? error.message : 'Error deleting drink!'));
        }
    };

    return (
        <div className="relative min-h-screen">
            <BackgroundIcons /> {/* Add background icons here */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">All Drinks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drinks.map((drink: Drink) => (
                        <div key={drink.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                            <div className="text-lg font-semibold text-primary mb-2">{drink.name} ({drink.size})</div>
                            <p className="text-sm text-gray-500 mb-4">{drink.category}</p>
                            <button
                                onClick={() => handleDelete(drink.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllDrinks;
