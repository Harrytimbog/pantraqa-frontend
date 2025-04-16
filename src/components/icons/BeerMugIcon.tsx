export default function BeerMugIcon({ className = '' }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3h6v2H9V3zM7 7h10v14H7V7zM4 10h2v6H4v-6z"
            />
        </svg>
    );
}
