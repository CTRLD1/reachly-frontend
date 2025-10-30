import React from 'react'
import { Link } from 'react-router'
import LogOutButton from '../Auth/LogOutButton'

function NavBar({user, setUser}) {
  return (
    <div>
      {
        user
          ?
          <LogOutButton setUser={setUser} />
          :
          <>
            <Link to={'/signup'}>Sign Up</Link>
            <Link to={'/login'}>Log In</Link>
          </>
      }
      <Link to={'/challenges'}>Challenges</Link>
    </div>
  )
}

export default NavBar
