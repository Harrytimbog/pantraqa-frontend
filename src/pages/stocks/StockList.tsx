import { useEffect, useState } from 'react';
import api from '../../lib/axios';

interface StockItem {
    id: number;
    drinkId: number;
    storageLocationId: number;
    quantity: number;
    threshold: number;
    updatedAt: string;
    Drink: {
        name: string;
        size: string;
        category: string;
    };
    StorageLocation: {
        name: string;
        type: string;
    };
}

const StockList = () => {
    const [stocks, setStocks] = useState<StockItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const res = await api.get('/stocks');

                setStocks(res.data.stocks);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch stock data');
                setLoading(false);
            }
        };

        fetchStock();
    }, []);

    if (loading) return <p className="text-center text-gray-500 mt-8">Loading stock data...</p>;
    if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold text-secondary mb-6 text-center">Stock Levels</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white rounded shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Drink</th>
                            <th className="px-4 py-2 text-left">Size</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Location</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock) => (
                            <tr key={stock.id} className="border-t">
                                <td className="px-4 py-2">{stock.Drink?.name}</td>
                                <td className="px-4 py-2">{stock.Drink?.size}</td>
                                <td className="px-4 py-2">{stock.quantity}</td>
                                <td className="px-4 py-2">{stock.StorageLocation?.name}</td>
                                <td className={`px-4 py-2 font-semibold ${stock.quantity <= stock.threshold ? 'text-red-500' : 'text-green-600'}`}>
                                    {stock.quantity <= stock.threshold ? 'Low' : 'OK'}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-500">
                                    {new Date(stock.updatedAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockList;
