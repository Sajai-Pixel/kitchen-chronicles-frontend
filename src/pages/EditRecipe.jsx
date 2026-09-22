import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { UserContext } from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

const EditRecipe = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const token = currentUser?.token;

  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    category: '',
    image: null,
  });

  // ReactQuill toolbar
  const quillModules = {
    toolbar: [
      [{ list: 'ordered' }],
      [{ list: 'bullet' }],
      ['bold', 'italic', 'underline'],
    ],
  };

  // Normal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Ingredients
  const handleIngredientsChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: value,
    }));
  };

  // Instructions
  const handleInstructionsChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      instructions: value,
    }));
  };

  // Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData((prevData) => ({
      ...prevData,
      image: file || null,
    }));
  };

  // Get existing recipe
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const getRecipe = async () => {
      try {
        const response = await axios.get(`${baseUrl}/recipes/${id}`);

        const {
          title,
          ingredients,
          instructions,
          prepTime,
          cookTime,
          category,
        } = response.data;

        setFormData({
          title: title || '',
          ingredients: ingredients || '',
          instructions: instructions || '',
          prepTime: prepTime || '',
          cookTime: cookTime || '',
          category: category
            ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
            : '',
          image: null,
        });
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
          'Failed to load the recipe. Please try again later.'
        );
      }
    };

    getRecipe();
  }, [id, token, navigate]);

  // Update recipe
  const editPost = async (e) => {
    e.preventDefault();

    setError('');

    const recipeData = new FormData();

    recipeData.append('title', formData.title);
    recipeData.append('ingredients', formData.ingredients);
    recipeData.append('instructions', formData.instructions);
    recipeData.append('prepTime', formData.prepTime);
    recipeData.append('cookTime', formData.cookTime);

    // Save category as lowercase
    recipeData.append('category', formData.category.toLowerCase());

    if (formData.image) {
      recipeData.append('thumbnail', formData.image);
    }

    try {
      const response = await axios.patch(
        `${baseUrl}/recipes/${id}`,
        recipeData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate(`/recipes/${id}`);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

      <div className="container max-w-lg bg-white p-8 rounded-lg shadow-lg">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Edit Recipe
        </h2>

        {/* Error */}
        {error && (
          <p className="bg-red-400 text-white p-3 mb-4 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={editPost} className="space-y-6">

          {/* Recipe Name */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Recipe Name
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Recipe Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Ingredients
            </label>

            <ReactQuill
              theme="snow"
              value={formData.ingredients}
              onChange={handleIngredientsChange}
              modules={quillModules}
              placeholder="Add ingredients..."
              className="h-[180px] mb-12"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Instructions
            </label>

            <ReactQuill
              theme="snow"
              value={formData.instructions}
              onChange={handleInstructionsChange}
              modules={quillModules}
              placeholder="Add step-by-step instructions..."
              className="h-[250px] mb-16"
            />
          </div>

          {/* Prep Time + Cook Time */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">

            {/* Prep Time */}
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Prep Time
              </label>

              <input
                type="text"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                placeholder="e.g., 15 minutes"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Cook Time */}
            <div className="flex-1 mt-4 sm:mt-0">
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Cook Time
              </label>

              <input
                type="text"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleChange}
                placeholder="e.g., 20 minutes"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* Cuisine */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Cuisine
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a cuisine</option>
              <option value="Italian">Italian</option>
              <option value="American">American</option>
              <option value="Mexican">Mexican</option>
              <option value="Chinese">Chinese</option>
              <option value="Indian">Indian</option>
              <option value="Japanese">Japanese</option>
              <option value="French">French</option>
              <option value="Thai">Thai</option>
              <option value="Mediterranean">Mediterranean</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Change Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg transition duration-200"
            >
              Update Recipe
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditRecipe;