import BackgroundIcons from "../BackgroundIcons";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden px-4">
            <BackgroundIcons />
            <div className="z-10 w-full max-w-md">{children}</div>
        </div>
    );
}
