import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
import Loader from '../components/Loader';

const DeleteRecipe = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { currentUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [navigate, token]);

  const deletePost = async () => {
    setIsLoading(true)
    try {
      const response = await axios.delete(`${baseUrl}/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        location.pathname === `/myrecipes/${currentUser.id}` ? navigate(0) : navigate('/');
      }
      setIsLoading(false)
    } catch (error) {
      console.log("Couldn't delete post");
    }
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <button
      onClick={deletePost}
      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-white text-sm md:text-base"
    >
      Delete
    </button>
  );
};

export default DeleteRecipe;
