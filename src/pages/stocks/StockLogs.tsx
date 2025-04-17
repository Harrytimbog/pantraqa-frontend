import { useEffect, useState } from 'react';
import api from '../../lib/axios';

interface StockLog {
    id: number;
    action: 'in' | 'out';
    quantity: number;
    createdAt: string;
    User: { email: string };
    Drink: { name: string; size: string };
    StorageLocation: { name: string };
}

const StockLogs = () => {
    const [logs, setLogs] = useState<StockLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await api.get('/stocklogs');
                setLogs(res.data.logs);
            } catch (err) {
                console.error(err);
                setError('Failed to load logs');
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading logs...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6 text-secondary text-center">Stock History Logs</h1>
            <ul className="space-y-4">
                {logs.map((log) => {
                    const date = new Date(log.createdAt).toLocaleString();
                    return (
                        <li key={log.id} className="bg-white shadow rounded p-4">
                            <p>
                                <span className="font-semibold text-primary">
                                    {log.Drink.name} ({log.Drink.size})
                                </span>{' '}
                                was stocked{' '}
                                <span className={log.action === 'in' ? 'text-green-600' : 'text-red-500'}>
                                    {log.action}
                                </span>{' '}
                                by <span className="font-medium">{log.User.email}</span> at{' '}
                                <span className="font-medium">{log.StorageLocation.name}</span> on{' '}
                                <span className="text-sm text-gray-600">{date}</span>.
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default StockLogs;
