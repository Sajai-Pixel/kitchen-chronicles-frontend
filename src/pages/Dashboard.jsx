import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Loader from '../components/Loader';
import axios from 'axios';
import DeleteRecipe from './DeleteRecipe';
const baseUrl = import.meta.env.VITE_BASE_URL;
const assetUrl = import.meta.env.VITE_ASSETS_URL;

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/recipes/users/${currentUser.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [navigate, token, currentUser.id]);

  // Center the loader and make sure it fills the screen
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {posts.length ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Left Section: Image and Name */}
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <img
                  src={`${assetUrl}/uploads/${post.thumbnail}`}
                  alt={post.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                />
                <h5 className="text-md sm:text-lg font-semibold text-gray-800">{post.title}</h5>
              </div>

              {/* Right Section: Action Buttons */}
              <div className="flex space-x-2">
                <Link
                  to={`/recipes/${post._id}`}
                  className="text-gray-800 bg-gray-300 hover:bg-gray-400 py-1 px-2 sm:px-3 rounded text-sm sm:text-base transition"
                >
                  View
                </Link>
                <Link
                  to={`/recipes/${post._id}/edit`}
                  className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 sm:px-3 rounded text-sm sm:text-base transition"
                >
                  Edit
                </Link>
                <DeleteRecipe id={post._id} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-lg sm:text-xl text-gray-700">You have no posts yet</h2>
      )}
    </section>
  );
};

export default Dashboard;
