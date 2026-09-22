import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL;

import { UserContext } from '../context/userContext'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {

  const [showPassword, setPassword] = useState(false)
  const handleTogglePassword = () => {
    setPassword(!showPassword)
  }
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { setCurrentUser } = useContext(UserContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // console.log(userData);

  const loginUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(`${baseUrl}/users/login`, userData)
      const user = await response.data
      setCurrentUser(user)
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }
  }


  return (
    <div className="container mx-auto max-w-md p-8 mt-[150px] bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
      <form className="space-y-4" onSubmit={loginUser}>
        {error && <p className="bg-red-500 text-white px-4 py-2 rounded-md">{error}</p>}

        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className='relative'>
          <input
            type={showPassword?'text':'password'}
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => handleTogglePassword()}
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
      <small className="block text-center mt-4 text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </small>
    </div>
  )
}

export default Login
