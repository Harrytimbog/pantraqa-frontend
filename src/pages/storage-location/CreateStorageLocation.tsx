import React, { useState } from 'react';
import api from '../../lib/axios';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateStorageLocation = () => {
    const [locationName, setLocationName] = useState('');
    const [locationType, setLocationType] = useState('pantry');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/storage-locations', {
                name: locationName,
                type: locationType,
                description: description,
            });

            // Check for success
            if (response.status === 201) {
                toast.success('Storage location created successfully!');
            }

            navigate('/dashboard');
        } catch (error: unknown) {
            // Handling error
            if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error || 'Error creating storage location!');
            } else {
                toast.error('An unexpected error occurred while creating the storage location.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-indigo-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">Add New Storage Location</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Location Name"
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <select
                            value={locationType}
                            onChange={(e) => setLocationType(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            <option value="pantry">Pantry</option>
                            <option value="cage">Cage</option>
                        </select>
                    </div>

                    <div>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-md shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all duration-300"
                    >
                        Create Location
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateStorageLocation;
