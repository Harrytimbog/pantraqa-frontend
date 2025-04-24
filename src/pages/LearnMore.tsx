import { Link } from "react-router-dom";
import BackgroundIcons from "../components/BackgroundIcons";

export default function LearnMore() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-white px-6 py-16">
            <BackgroundIcons />

            <div className="max-w-4xl mx-auto text-center z-10 relative">
                <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6">
                    What is <span className="text-accent">Pantraqa</span>?
                </h1>

                <p className="text-lg md:text-xl text-gray-700 mb-10">
                    <strong>Pantraqa</strong> is a smart inventory management system tailored for hospitality teams who manage beverage stock across multiple suite pantries and storage locations.
                </p>

                <div className="grid md:grid-cols-3 gap-8 text-left text-gray-700">
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold text-primary mb-2">📦 Real-time Tracking</h3>
                        <p>Monitor beverage stock levels instantly across suite pantries and storage locations.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold text-accent mb-2">🥂 Smart Logging</h3>
                        <p>Track stock-ins and stock-outs per user with intuitive logs for transparency and accountability.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold text-secondary mb-2">📊 Visual Dashboard</h3>
                        <p>Get quick insights with top-moving drinks, location-based stock, and user activity summaries.</p>
                    </div>
                </div>

                <div className="mt-12">
                    <Link
                        to="/login"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-md shadow-md hover:from-purple-700 hover:to-pink-600 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}
