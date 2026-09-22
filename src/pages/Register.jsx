import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const baseUrl = import.meta.env.VITE_BASE_URL;

const Register = () => {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleTogglePassword = (passwordType) => {
    if (passwordType === 'password') setShowPassword(!showPassword)
    else if (passwordType === 'confirm') setShowConfirmPassword(!showConfirmPassword)
  }
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // console.log(userData);

  const registerUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(
        `${baseUrl}/users/register`,
        userData
      );

      const newUser = await response.data
      console.log(newUser);
      if (!newUser) {
        setError("Couldn't register user. Please try again")
      }
      navigate('/login')

    } catch (err) {
      // console.log(err);
      setError(err.response.data.message)
    }
  }


  return (
    <div className="container mt-[100px] mx-auto max-w-md p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
      <form className="space-y-4" onSubmit={registerUser}>
        {error && <p className="bg-red-500 text-white px-4 py-2 rounded-md">{error}</p>}
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => handleTogglePassword('password')}
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
          />
        </div>
        <div className='relative'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="password2"
            value={userData.password2}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEyeSlash : faEye}
            onClick={() => handleTogglePassword('confirm')}
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
      <small className="block text-center mt-4 text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </small>
    </div>
  )
}

export default Register
