import BackgroundIcons from "../components/BackgroundIcons";
import GetStartedButton from "../components/UI/GetStartedButton";

function HomePage() {
    return (
        <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-100 to-white px-6 text-center">
            <BackgroundIcons />

            <div className="z-10 max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-secondary">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                        Welcome
                    </span>{" "}
                    to <span className="text-accent">Pantraqa</span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-gray-700">
                    Smart stock tracking for pantries and storage — intuitive, efficient, and reliable.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <GetStartedButton />
                    <button
                        className="px-6 py-3 rounded-md border border-accent text-accent bg-white 
             hover:bg-gray-100 hover:text-accent 
             font-medium transition-all duration-200 ease-in-out 
             shadow-sm hover:shadow-md active:scale-95"
                    >
                        Learn More
                    </button>

                </div>
            </div>
        </main>
    );
}

export default HomePage;
