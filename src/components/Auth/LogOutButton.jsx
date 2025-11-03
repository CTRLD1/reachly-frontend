// ref: cat-collector classwork code
import React from 'react'
import { clearTokens } from '../../lib/auth'
import { useNavigate } from 'react-router'

function LogOutButton({setUser}) {
    const navigate = useNavigate()
    function handleLogOut(){
        clearTokens()
        setUser(null)
        navigate('/login')
    }
  return (
    <div>
      <button onClick={handleLogOut} className="logout text-text hover:text-[#E74C3C] transition-colors duration-200">Log Out</button>
    </div>
  )
}

export default LogOutButton