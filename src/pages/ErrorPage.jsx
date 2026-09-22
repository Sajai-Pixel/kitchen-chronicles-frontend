import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">The page you’re looking for doesn’t exist or an error occurred.</p>
      <Link
        to={'/'}
        className="bg-indigo-500 text-white py-2 px-6 rounded-full hover:bg-indigo-600 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
