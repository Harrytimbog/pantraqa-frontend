// src/pages/stocks/StockIn.tsx

import StockForm from "../../components/UI/StockForm";

const StockIn = () => {
    return (
        <div className="py-10 px-4">
            <h1 className="text-2xl font-bold text-secondary mb-6 text-center">Stock In</h1>
            <StockForm action="in" />
        </div>
    );
};

export default StockIn;
