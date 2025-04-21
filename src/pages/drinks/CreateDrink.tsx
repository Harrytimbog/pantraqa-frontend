import React, { useState } from 'react';
import api from '../../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateDrink = () => {
    const [drinkName, setDrinkName] = useState('');
    const [drinkSize, setDrinkSize] = useState('');
    const [drinkCategory, setDrinkCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/drinks/create-drink', {
                name: drinkName,
                size: drinkSize,
                category: drinkCategory,
            });
            toast.success('Drink created successfully!');
            navigate('/drinks');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || 'Error creating drink!');
            } else {
                toast.error('Error creating drink!');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-indigo-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">Add New Drink</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Drink Name"
                            value={drinkName}
                            onChange={(e) => setDrinkName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Size"
                            value={drinkSize}
                            onChange={(e) => setDrinkSize(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Category"
                            value={drinkCategory}
                            onChange={(e) => setDrinkCategory(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-md shadow-lg hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300"
                    >
                        Create Drink
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateDrink;
