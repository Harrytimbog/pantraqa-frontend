import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;