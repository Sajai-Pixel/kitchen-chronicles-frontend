import { useContext, useEffect } from 'react'

import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setCurrentUser(null)
    navigate('/')
  }, [setCurrentUser, navigate])

  return null
}

export default Logout