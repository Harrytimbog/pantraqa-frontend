import { User } from '../context/AuthContext';
import { StockItem } from '../types';

interface Props {
    stock: StockItem;
    user: User;
    onEditClick: (stock: StockItem) => void;
}

const StockRow = ({ stock, user, onEditClick }: Props) => {
    return (
        <tr className="border-t">
            <td className="px-4 py-2">{stock.Drink?.name}</td>
            <td className="px-4 py-2">{stock.Drink?.size}</td>
            <td className="px-4 py-2">{stock.Drink?.category}</td>
            <td className="px-4 py-2">{stock.quantity}</td>
            <td className="px-4 py-2">{stock.StorageLocation?.name}</td>
            <td
                className={`px-4 py-2 font-semibold ${stock.quantity <= stock.threshold ? 'text-red-500' : 'text-green-600'
                    }`}
            >
                {stock.quantity <= stock.threshold ? 'Low' : 'OK'}
            </td>
            <td className="px-4 py-2 text-sm text-gray-500">
                {new Date(stock.updatedAt).toLocaleString()}
            </td>
            <td className="px-4 py-2 text-right">
                {(user?.role === 'manager' || user?.role === 'admin') && (
                    <button
                        onClick={() => onEditClick(stock)}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Edit
                    </button>
                )}
            </td>
        </tr>
    );
};

export default StockRow;
