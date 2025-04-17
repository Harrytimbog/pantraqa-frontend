import StockForm from "./StockForm";

const StockOut = () => {
    return (
        <div className="py-10 px-4">
            <h1 className="text-2xl font-bold text-secondary mb-6 text-center">Stock Out</h1>
            <StockForm action="out" />
        </div>
    );
};

export default StockOut;