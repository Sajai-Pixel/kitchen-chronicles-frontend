import { useContext, useEffect, useState } from 'react';
import RecipeAuthor from '../components/RecipeAuthor';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Loader from '../components/Loader';
import DeleteRecipe from './DeleteRecipe';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;
const assetUrl = import.meta.env.VITE_ASSETS_URL;
const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
  useEffect(() => {
    const getRecipe = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getRecipe();
  }, [id]);
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl">
          Error loading recipe: {error.message}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-10">
      {recipe && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Recipe Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Top Section */}
            <div className="p-5 sm:p-8 lg:p-10">
              {/* Author + Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <RecipeAuthor
                  userId={recipe.creator}
                  createdAt={recipe.createdAt}
                />
                {currentUser?.id === recipe.creator && (
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/recipes/${recipe._id}/edit`}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
                    >
                      Edit
                    </Link>
                    <DeleteRecipe id={id} />
                  </div>
                )}
              </div>

              {/* Recipe Header */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Recipe Image */}
                <div className="w-full lg:w-1/2">
                  <div className="overflow-hidden rounded-2xl bg-gray-100">
                    <img
                      src={`${assetUrl}/uploads/${recipe.thumbnail}`}
                      alt={recipe.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                </div>

                {/* Recipe Information */}
                <div className="w-full lg:w-1/2 flex flex-col justify-start">
                  {/* Category */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                      {recipe.category.charAt(0).toUpperCase() +
                        recipe.category.slice(1)}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
                    {recipe.title}
                  </h1>
                  <p className="text-gray-500 leading-relaxed mb-8">
                    A delicious recipe with simple ingredients and easy-to-follow
                    instructions.
                  </p>

                  {/* Recipe Stats */}
                  <div className="flex flex-wrap gap-3">
                    {/* Prep Time */}
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 min-w-[150px]">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <i className="fa-solid fa-clock text-blue-600"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-medium">
                          Prep Time
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          {recipe.prepTime} Minutes
                        </p>
                      </div>
                    </div>
                    {/* Cook Time */}
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 min-w-[150px]">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <i className="fa-solid fa-fire text-orange-500"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-medium">
                          Cook Time
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          {recipe.cookTime} Minutes
                        </p>
                      </div>
                    </div>
                    {/* Cuisine */}
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 min-w-[150px]">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <i className="fa-solid fa-utensils text-green-600"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-medium">
                          Cuisine
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          {recipe.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="border-t border-gray-100"></div>
            {/* Recipe Content */}
            <div className="p-5 sm:p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
                {/* ================= INGREDIENTS ================= */}
<div className="w-full lg:w-[35%]">

  <div className="flex items-center gap-3 mb-6">

    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
      <i className="fa-solid fa-list text-blue-600"></i>
    </div>

    <h2 className="text-2xl font-bold text-gray-900">
      Ingredients
    </h2>

  </div>

  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">

    <div
      className="
        text-gray-700 leading-7

        [&_ol]:list-none
        [&_ol]:p-0
        [&_ol]:m-0
        [&_ol]:[counter-reset:recipe]

        [&_ul]:list-disc
        [&_ul]:pl-6

        [&_ol_li]:relative
        [&_ol_li]:[counter-increment:recipe]
        [&_ol_li]:pl-9
        [&_ol_li]:mb-4

        [&_ol_li]:before:content-[counter(recipe)]
        [&_ol_li]:before:absolute
        [&_ol_li]:before:left-0
        [&_ol_li]:before:top-1
        [&_ol_li]:before:w-6
        [&_ol_li]:before:h-6
        [&_ol_li]:before:rounded-full
        [&_ol_li]:before:bg-blue-100
        [&_ol_li]:before:text-blue-600
        [&_ol_li]:before:flex
        [&_ol_li]:before:items-center
        [&_ol_li]:before:justify-center
        [&_ol_li]:before:text-xs
        [&_ol_li]:before:font-semibold

        [&_ul_li]:mb-2

        [&_p]:mb-3
        [&_strong]:font-semibold
      "
      dangerouslySetInnerHTML={{
        __html: recipe.ingredients,
      }}
    />

  </div>

</div>


{/* ================= INSTRUCTIONS ================= */}
<div className="w-full lg:w-[65%]">

  <div className="flex items-center gap-3 mb-6">

    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
      <i className="fa-solid fa-book-open text-orange-500"></i>
    </div>

    <h2 className="text-2xl font-bold text-gray-900">
      Instructions
    </h2>

  </div>

  <div
    className="
      text-gray-700 leading-7

      [&_ol]:list-none
      [&_ol]:p-0
      [&_ol]:m-0
      [&_ol]:[counter-reset:step]

      [&_ul]:list-disc
      [&_ul]:pl-6

      [&_ol_li]:relative
      [&_ol_li]:[counter-increment:step]
      [&_ol_li]:pl-10
      [&_ol_li]:mb-5

      [&_ol_li]:before:content-[counter(step)]
      [&_ol_li]:before:absolute
      [&_ol_li]:before:left-0
      [&_ol_li]:before:top-1
      [&_ol_li]:before:w-7
      [&_ol_li]:before:h-7
      [&_ol_li]:before:rounded-full
      [&_ol_li]:before:bg-orange-100
      [&_ol_li]:before:text-orange-500
      [&_ol_li]:before:flex
      [&_ol_li]:before:items-center
      [&_ol_li]:before:justify-center
      [&_ol_li]:before:text-sm
      [&_ol_li]:before:font-semibold

      [&_ul_li]:mb-2

      [&_p]:mb-4
      [&_strong]:font-semibold

      [&_h1]:text-2xl
      [&_h1]:font-bold
      [&_h1]:mb-3

      [&_h2]:text-xl
      [&_h2]:font-bold
      [&_h2]:mb-3
    "
    dangerouslySetInnerHTML={{
      __html: recipe.instructions,
    }}
  />

</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RecipeDetail;