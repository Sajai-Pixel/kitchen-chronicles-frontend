import RecipeAuthor from './RecipeAuthor';
import { Link } from 'react-router-dom';

const assetUrl = import.meta.env.VITE_ASSETS_URL;

const RecipeItem = ({ recipeId, thumbnail, category, title, userId, createdAt }) => {
    return (
        <div className="w-full overflow-hidden rounded-2xl bg-white p-4 shadow-[0_10px_30px_-12px_rgba(31,42,34,0.25)]">
            <Link to={`/recipes/${recipeId}`}>
                <div className="h-[200px] w-full overflow-hidden rounded-xl sm:h-[250px]">
                    <img
                        src={`${assetUrl}/uploads/${thumbnail}`}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                </div>
            </Link>
            <div className="py-4">
                <h3
                    className="text-lg capitalize text-[#1F2A22] sm:text-xl"
                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                >
                    <Link to={`/recipes/${recipeId}`} className="transition-colors hover:text-[#C99A44]">
                        {title}
                    </Link>
                </h3>
                <div
                    className="mt-4 flex flex-col items-start justify-between space-y-2 text-sm capitalize text-gray-600 sm:flex-row sm:items-center sm:space-y-0"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <RecipeAuthor createdAt={createdAt} userId={userId} />
                    <Link
                        to={`/recipes/categories/${category}`}
                        className="rounded-md bg-[#C99A44]/15 px-2 py-1 text-center capitalize text-[#a8791f] transition-colors hover:bg-[#1F2A22] hover:text-white"
                    >
                        {category}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecipeItem;