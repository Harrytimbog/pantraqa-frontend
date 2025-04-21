
import LoadingSpinner from "../components/UI/LoadingSpinner";

const PageLoader = ({ message = 'Loading Pantraqa...' }: { message?: string }) => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-indigo-50 text-secondary">
            <div className="flex flex-col items-center gap-4">
                <LoadingSpinner />
                <h2 className="text-xl font-semibold animate-pulse">{message}</h2>
            </div>
        </div>
    );
};

export default PageLoader;
