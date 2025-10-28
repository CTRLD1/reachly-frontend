import React from 'react'
import { Link } from 'react-router'

function NavBar() {
  return (
    <div>
      <Link to={'/challenges'}>Challenges</Link>
    </div>
  )
}

export default NavBar
