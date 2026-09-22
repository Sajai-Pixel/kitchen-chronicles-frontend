import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const baseUrl = import.meta.env.VITE_BASE_URL;
const assetUrl = import.meta.env.VITE_ASSETS_URL;
import localImage from '../assets/avatar.jpg'
import Loader from '../components/Loader'

const Authors = () => {
  const [authors, setAuthors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${baseUrl}/users`)
        const authors = response.data.filter((user) => user.posts > 0)
        setAuthors(authors)
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)
    }
    getAuthors()
  }, [])

  if (isLoading) {
    return <Loader />
  }


  return (
    <div className="p-6">
      {authors.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 capitalize container px-6">
          {authors.map(({ _id, avatar, name, posts }) => (
            <Link
              key={_id}
              to={`/recipes/users/${_id}`}
              className="block bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={avatar ? `${assetUrl}/uploads/${avatar}` : localImage}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
                  <p className="text-sm text-gray-500">
                    {posts} {posts === 1 ? 'Recipe' : 'Recipes'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600">
            No Users / Authors Found
          </h2>
          <p className="text-gray-500 mt-2">Please check back later.</p>
        </div>
      )}
    </div>
  )
}

export default Authors
