import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { faCheck, faEdit, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import avatar2 from '../assets/avatar2.jpg'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL;
const assetsUrl = import.meta.env.VITE_ASSETS_URL;

const UserProfile = () => {
  const [avatarPreview, setAvatarPreview] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [isAvatarTouched, setIsAvatarTouched] = useState(false)
  const [error, setError] = useState('')
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleTogglePassword = (passwordType) => {
    if (passwordType === 'current') setShowCurrentPassword(!showCurrentPassword)
    else if (passwordType === 'new') setShowNewPassword(!showNewPassword)
    else if (passwordType === 'confirm') setShowConfirmPassword(!showConfirmPassword)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const { currentUser } = useContext(UserContext)
  const token = currentUser?.token
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarPreview(URL.createObjectURL(file))
      setAvatarFile(file)
      setIsAvatarTouched(true)
    }
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/users/${currentUser.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const { name, email, avatar } = response.data
        setUserData(prevData => ({ ...prevData, name, email }))
        setAvatarPreview(`${assetsUrl}/uploads/${avatar}`)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      }
    }

    getUser()
  }, [currentUser?.id, token])

  const changeAvatarHandler = async () => {
    if (!avatarFile) return

    setIsAvatarTouched(false)
    try {
      const postData = new FormData()
      postData.append('avatar', avatarFile)

      const response = await axios.post(
        `${baseUrl}/users/change-avatar`,
        postData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setAvatarPreview(`${assetsUrl}/uploads/${response.data.avatar}`)
      setAvatarFile(null)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message)
      } else {
        console.log("An unexpected error occurred.")
      }
    }
  }

  const updateUserdetail = async (e) => {
    e.preventDefault()

    try {
      const newuserData = new FormData()
      newuserData.append('name', userData.name)
      newuserData.append('email', userData.email)
      newuserData.append('currentPassword', userData.currentPassword)
      newuserData.append('newPassword', userData.newPassword)
      newuserData.append('confirmNewPassword', userData.confirmNewPassword)

      const response = await axios.patch(`${baseUrl}/users/edit-user`, newuserData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.status === 200) {
        navigate('/logout')
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <section className="flex justify-center py-10 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex flex-col justify-center items-center">
        <Link to={`/myrecipes/${currentUser.id}`} className="bg-gray-200 px-4 py-2 mb-4 hover:bg-gray-800 hover:text-white transition rounded-full">
          My Posts
        </Link>
        <div className="profileDetails">
          <div className="avatar_wrapper flex flex-col items-center mb-6">
            <div className="profile relative mb-4">
              <img
                src={avatarPreview || avatar2}
                alt="Profile Avatar"
                className="w-32 h-32 rounded-full border-8 border-gray-300 object-cover"
              />
              <form className="absolute bottom-0 right-0 flex items-center space-x-2">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className={`bg-slate-900 text-white p-2 w-10 h-10 flex items-center justify-center cursor-pointer rounded-full ${isAvatarTouched ? 'hidden' : ''}`}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </label>
                {isAvatarTouched &&
                  <button
                    onClick={changeAvatarHandler}
                    type="button"
                    className="bg-green-500 p-2 w-10 h-10 flex items-center justify-center cursor-pointer rounded-full"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>}
              </form>
            </div>
          </div>

          <h1 className="text-center text-2xl font-semibold text-gray-700 mb-4 capitalize">{currentUser.name}</h1>

          <form onSubmit={updateUserdetail} className="space-y-4">
            {error && <p className="bg-red-400 w-full px-4 py-2 border rounded-lg">{error}</p>}
            <input
              type="text"
              placeholder="Full name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Current Password"
                name="currentPassword"
                value={userData.currentPassword}
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={showCurrentPassword ? faEyeSlash : faEye}
                onClick={() => handleTogglePassword('current')}
                className="absolute right-4 top-3 cursor-pointer text-gray-500"
              />
            </div>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="New Password"
                name="newPassword"
                value={userData.newPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={showNewPassword ? faEyeSlash : faEye}
                onClick={() => handleTogglePassword('new')}
                className="absolute right-4 top-3 cursor-pointer text-gray-500"
              />
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                name="confirmNewPassword"
                value={userData.confirmNewPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={() => handleTogglePassword('confirm')}
                className="absolute right-4 top-3 cursor-pointer text-gray-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
            >
              Update Details
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile
