import { ChangeEvent, useEffect, useState } from 'react';
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

type SortKey = 'name' | 'quantity' | 'updatedAt';
type FilterStatus = 'all' | 'low' | 'ok';

const StockList = () => {
    const [stocks, setStocks] = useState<StockItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortKey, setSortKey] = useState<SortKey>('updatedAt');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

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

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortKey(e.target.value as SortKey);
    };

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(e.target.value as FilterStatus);
    };

    const filteredAndSortedStocks = stocks
        .filter((stock) => {
            if (filterStatus === 'low') return stock.quantity <= stock.threshold;
            if (filterStatus === 'ok') return stock.quantity > stock.threshold;
            return true;
        })
        .sort((a, b) => {
            if (sortKey === 'name') {
                return a.Drink.name.localeCompare(b.Drink.name);
            }
            if (sortKey === 'quantity') {
                return b.quantity - a.quantity;
            }
            if (sortKey === 'updatedAt') {
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            }
            return 0;
        });

    if (loading) return <p className="text-center text-gray-500 mt-8">Loading stock data...</p>;
    if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold text-secondary mb-6 text-center">Stock Levels</h1>
            <div className="overflow-x-auto">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <select
                        value={sortKey}
                        onChange={handleSortChange}
                        className="border rounded px-3 py-2"
                    >
                        <option value="updatedAt">Sort by: Updated</option>
                        <option value="name">Sort by: Drink Name</option>
                        <option value="quantity">Sort by: Quantity</option>
                    </select>

                    <select
                        value={filterStatus}
                        onChange={handleFilterChange}
                        className="border rounded px-3 py-2"
                    >
                        <option value="all">All</option>
                        <option value="low">Low Stock</option>
                        <option value="ok">Stock OK</option>
                    </select>
                </div>

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
                        {filteredAndSortedStocks.map((stock) => (
                            <tr key={stock.id} className="border-t">
                                <td className="px-4 py-2">{stock.Drink?.name}</td>
                                <td className="px-4 py-2">{stock.Drink?.size}</td>
                                <td className="px-4 py-2">{stock.quantity}</td>
                                <td className="px-4 py-2">{stock.StorageLocation?.name}</td>
                                <td
                                    className={`px-4 py-2 font-semibold ${stock.quantity <= stock.threshold
                                        ? 'text-red-500'
                                        : 'text-green-600'
                                        }`}
                                >
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
