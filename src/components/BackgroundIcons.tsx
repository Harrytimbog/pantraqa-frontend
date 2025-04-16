import BeerMugIcon from "./icons/BeerMugIcon";
import CocktailIcon from "./icons/CocktailIcon";
import WineGlassIcon from "./icons/WineGlassIcon";

export default function BackgroundIcons() {
    return (
        <>
            {/* Top Left */}
            <WineGlassIcon className="absolute top-10 left-10 w-16 text-primary opacity-10 rotate-2 animate-float" />
            <CocktailIcon className="absolute top-20 left-1/3 w-12 text-accent opacity-10 -rotate-6 animate-floatAlt" />

            {/* Bottom Right */}
            <BeerMugIcon className="absolute bottom-20 right-10 w-20 text-secondary opacity-10 rotate-6 animate-floatAlt" />
            <CocktailIcon className="absolute bottom-10 right-1/4 w-14 text-accent opacity-10 rotate-3 animate-float" />

            {/* Center scatter */}
            <BeerMugIcon className="absolute top-1/3 right-1/3 w-16 text-secondary opacity-10 rotate-12 animate-float" />
            <WineGlassIcon className="absolute bottom-1/3 left-1/4 w-14 text-primary opacity-10 -rotate-12 animate-floatAlt" />
        </>
    );
}
