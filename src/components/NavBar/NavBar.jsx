import React from 'react'
import { Link } from 'react-router'
import LogOutButton from '../Auth/LogOutButton'

function NavBar({ user, setUser }) {
  return (
    <nav>
      {
        user
          ?
          (
            <>
              <LogOutButton setUser={setUser} />
              <Link to={'/challenges'}>Challenges</Link>
              <Link to={'/userchallenges'}>My Challenges</Link>
              <Link to={'/reflections'}>Reflections</Link>
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
      <Link to={'/'}>Home</Link>

    </nav>
  )
}

export default NavBar
