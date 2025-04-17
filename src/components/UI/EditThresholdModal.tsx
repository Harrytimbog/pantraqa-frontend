import { useState } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newThreshold: number) => void;
    currentThreshold: number;
}

const EditThresholdModal = ({ isOpen, onClose, onSave, currentThreshold }: Props) => {
    const [threshold, setThreshold] = useState(currentThreshold);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(threshold);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-xl font-bold text-secondary mb-4">Edit Threshold</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        value={threshold}
                        onChange={(e) => setThreshold(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded mb-4"
                        required
                        min={1}
                    />
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditThresholdModal;
