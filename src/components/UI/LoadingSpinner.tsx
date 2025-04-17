const LoadingSpinner = ({ size = 12 }: { size?: number }) => {
    return (
        <div className="flex justify-center items-center">
            <div
                className={`w-${size} h-${size} border-4 border-accent border-t-transparent rounded-full animate-spin`}
            />
        </div>
    );
};

export default LoadingSpinner;
