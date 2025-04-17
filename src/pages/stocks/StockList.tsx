import { ChangeEvent, useEffect, useState } from 'react';
import api from '../../lib/axios';
import toast from 'react-hot-toast';
import EditThresholdModal from '../../components/UI/EditThresholdModal';
import StockRow from '../../components/StockRow';
import { useAuth } from '../../context/AuthContext';

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

interface Pagination {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    perPage: number;
}

type SortKey = 'name' | 'quantity' | 'updatedAt';
type FilterStatus = 'all' | 'low' | 'ok';

const StockList = () => {
    const [stocks, setStocks] = useState<StockItem[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortKey, setSortKey] = useState<SortKey>('updatedAt');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
    const [editingStockId, setEditingStockId] = useState<number | null>(null);
    const [currentThreshold, setCurrentThreshold] = useState<number>(0);

    const { user } = useAuth();

    const fetchStock = async (page: number = 1) => {
        setLoading(true);
        try {
            const res = await api.get(`/stocks?page=${page}&limit=10`);
            setStocks(res.data.stocks);
            setPagination(res.data.pagination);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch stock data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStock(currentPage);
    }, [currentPage]);

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
            if (sortKey === 'name') return a.Drink.name.localeCompare(b.Drink.name);
            if (sortKey === 'quantity') return b.quantity - a.quantity;
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });

    const handleEditClick = (stock: StockItem) => {
        setEditingStockId(stock.id);
        setCurrentThreshold(stock.threshold);
    };

    const handleSaveThreshold = async (newThreshold: number) => {
        if (!editingStockId) return;
        try {
            await api.patch(`/stocks/${editingStockId}/threshold`, { threshold: newThreshold });
            toast.success('Threshold updated');
            fetchStock(currentPage);
        } catch (err) {
            console.error(err);
            toast.error('Failed to update threshold');
        } finally {
            setEditingStockId(null);
        }
    };

    if (loading) return <p className="text-center text-gray-500 mt-8">Loading stock data...</p>;
    if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold text-secondary mb-6 text-center">Stock Levels</h1>
            <div className="overflow-x-auto">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <select value={sortKey} onChange={handleSortChange} className="border rounded px-3 py-2">
                        <option value="updatedAt">Sort by: Updated</option>
                        <option value="name">Sort by: Drink Name</option>
                        <option value="quantity">Sort by: Quantity</option>
                    </select>

                    <select value={filterStatus} onChange={handleFilterChange} className="border rounded px-3 py-2">
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
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Location</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Last Updated</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedStocks.map((stock) => (
                            <StockRow
                                key={stock.id}
                                stock={stock}
                                user={user!}
                                onEditClick={handleEditClick}
                            />
                        ))}
                    </tbody>
                </table>

                {pagination && (
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-700">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages))}
                            disabled={currentPage === pagination.totalPages}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            <EditThresholdModal
                isOpen={editingStockId !== null}
                currentThreshold={currentThreshold}
                onClose={() => setEditingStockId(null)}
                onSave={handleSaveThreshold}
            />
        </div>
    );
};

export default StockList;
