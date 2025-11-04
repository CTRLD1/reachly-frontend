import React from 'react'
import { Link } from 'react-router'
import LogOutButton from '../Auth/LogOutButton'

function NavBar({ user, setUser }) {
  return (
    <nav className='sticky top-0 z-50'>
      <Link to={'/'}>Home</Link>
      {
        user
          ?
          (
            <>
              <Link to={'/challenges'}>Challenges</Link>
              <Link to={'/userchallenges'}>My Challenges</Link>
              <Link to={'/reflections'}>Reflections</Link>
              <Link to={'/profile'}>Profile</Link>
              <LogOutButton setUser={setUser} />
            </>
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
