import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BASE_URL;
const assetUrl = import.meta.env.VITE_ASSETS_URL;
import localImage from '../assets/avatar.jpg'



const RecipeAuthor = ({ userId, createdAt }) => {

    const date = new Date(createdAt)
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      const formattedDate = date.toLocaleDateString("en-US", options);

    const [author, setAuthor] = useState({})

    useEffect(() => {
        const getAuthor = async () => {
            try { 
                const response = await axios.get(`${baseUrl}/users/${userId}`)
                setAuthor(response?.data)
            } catch (err) {
                console.log(err);
            }
        }
        getAuthor()
    }, [])

    return (
        <div className="">
            <Link to={`/recipes/users/${userId}`} className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img
                        src={author?.avatar ? `${assetUrl}/uploads/${author.avatar}` : localImage}
                        className="w-full h-full object-cover"
                    /> 
                </div>
                <div>
                    <h5 className=" text-gray-800">By: {author.name}</h5>
                    <small className="text-gray-500">{formattedDate}</small>
                </div>
            </Link>
        </div>

    )
}

export default RecipeAuthor
