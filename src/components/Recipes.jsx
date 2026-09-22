import { useEffect, useMemo, useState } from 'react';
import RecipeItem from './RecipeItem';
import Loader from '../components/Loader';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${baseUrl}/recipes`);
                setRecipes(response?.data ?? []);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    const filteredRecipes = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return recipes;
        return recipes.filter((recipe) => recipe.title?.toLowerCase().includes(q));
    }, [query, recipes]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1
                className="pt-12 pb-6 text-center text-4xl text-[#1F2A22]"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
            >
                Explore Our Recipes
            </h1>

            <div className="relative mx-auto mb-12 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-full border-2 border-[#C99A44]/40 bg-white py-3 pl-12 pr-5 text-[#1F2A22] placeholder:text-[#1F2A22]/40 focus:border-[#C99A44] focus:outline-none"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                />
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#1F2A22]/40">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>

            {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {filteredRecipes.map(({ _id, thumbnail, category, title, instructions, creator, createdAt }) => (
                        <div className="relative" key={_id}>
                            <RecipeItem
                                recipeId={_id}
                                thumbnail={thumbnail}
                                category={category}
                                title={title}
                                instructions={instructions}
                                userId={creator}
                                createdAt={createdAt}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex h-80 items-center justify-center">
                    <h2
                        className="text-center text-2xl text-[#1F2A22]/70 sm:text-3xl"
                        style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                    >
                        {query ? `No recipes match "${query}"` : 'No recipes found'}
                    </h2>
                </div>
            )}
        </div>
    );
};

export default Recipes;