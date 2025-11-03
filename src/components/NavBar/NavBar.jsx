import React from 'react'
import { Link } from 'react-router'
import LogOutButton from '../Auth/LogOutButton'

function NavBar({ user, setUser }) {
  return (
    <nav className="bg-navbar text-text justify-between items-center px-8 py-4 shadow-md" >
      <Link to={'/'}>Home</Link>
      {
        user
          ?
          (
            <div className="flex space-x-6  items-center text-sm font-medium">
              <Link to={'/challenges'}>Challenges</Link>
              <Link to={'/userchallenges'}>My Challenges</Link>
              <Link to={'/reflections'}>Reflections</Link>
              <Link to={'/profile'}>Profile</Link>
              <LogOutButton setUser={setUser} />
            </div>
          )
          :
          (

            <>
              <Link to={'/signup'}>Sign Up</Link>
              <Link to={'/login'}>Log In</Link>
            </>
          )
      }


    </nav>
  )
}

export default NavBar
