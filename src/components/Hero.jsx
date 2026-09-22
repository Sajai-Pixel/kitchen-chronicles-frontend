import { useEffect, useRef, useState } from 'react';
import chef from '../assets/chef.png';
import chef2 from '../assets/chef2.png';
import chef1 from '../assets/chef1.png';


// Tailwind: add `fontFamily: { serif: ['Fraunces', 'serif'], sans: ['Inter', 'sans-serif'] }`
// to your tailwind.config.js theme.extend if you want font-serif / font-sans to
// resolve to them; otherwise the inline styles below cover it directly.

const Hero = () => {
    const images = [chef1, chef, chef2];
    const [currentIndex, setCurrentIndex] = useState(0);
    const reducedMotion = useRef(false);

    useEffect(() => {
        reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion.current) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative overflow-hidden bg-[#FBF6EE]">
            {/* soft background wash, kept off to one side so it doesn't read as a centered glow */}
            <div
                className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full opacity-40 blur-3xl"
                style={{ background: 'radial-gradient(circle, #C99A44 0%, transparent 70%)' }}
            />

            <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
                {/* Text column */}
                <div className="max-w-xl">
                    <h1
                        className="text-[2.75rem] leading-[1.08] text-[#1F2A22] sm:text-6xl"
                        style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, letterSpacing: '-0.01em' }}
                    >
                        Recipes that make weeknights feel like Sunday supper
                    </h1>

                    <p
                        className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-[#1F2A22]/70"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Step-by-step dishes built for real kitchens and real schedules —
                        tested until they're foolproof, then written so you'll actually
                        want to cook them again.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                        <button
                            className="rounded-full px-7 py-3.5 text-[0.95rem] font-medium text-[#FBF6EE] transition-colors hover:bg-[#16201A]"
                            style={{ backgroundColor: '#1F2A22', fontFamily: "'Inter', sans-serif" }}
                        >
                            Explore all recipes
                        </button>

                        <a
                            href="#weekly-picks"
                            className="text-[0.95rem] font-medium text-[#1F2A22] underline decoration-[#C99A44] decoration-2 underline-offset-4 transition-colors hover:text-[#B84B32]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            See this week's picks
                        </a>
                    </div>

                    <div className="mt-12 flex items-center gap-3">
                        <div className="flex -space-x-3">
                            {images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt=""
                                    className="h-9 w-9 rounded-full border-2 object-cover"
                                    style={{ borderColor: '#FBF6EE' }}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-[#1F2A22]/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Cooked along with 12,000+ home cooks this week
                        </p>
                    </div>
                </div>

                {/* Image column */}
                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                    <div
                        className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden lg:ml-auto"
                        style={{ borderRadius: '63% 37% 54% 46% / 43% 37% 63% 57%' }}
                    >
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt="Chef preparing a dish"
                                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
                                style={{ opacity: i === currentIndex ? 1 : 0 }}
                            />
                        ))}
                    </div>

                    {/* dashed ring, offset behind the blob */}
                    <div
                        className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full border-2 border-dashed lg:left-auto lg:-right-6"
                        style={{ borderColor: '#C99A44' }}
                    />

                    {/* floating stat card */}
                    <div className="absolute -bottom-6 left-1/2 w-52 -translate-x-1/2 rounded-2xl bg-white px-5 py-4 shadow-[0_12px_40px_-10px_rgba(31,42,34,0.25)] lg:left-6 lg:translate-x-0">
                        <p
                            className="text-2xl text-[#1F2A22]"
                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                        >
                            240+
                        </p>
                        <p className="text-xs text-[#1F2A22]/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                            recipes tested in our own kitchen
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;