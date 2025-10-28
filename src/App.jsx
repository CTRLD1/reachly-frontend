import React from 'react'
import axios from 'axios'

import { BrowserRouter as Router, Routes, Route } from 'react-router'
import NavBar from './components/NavBar/NavBar'

const URL = import.meta.env.VITE_API_URL

function App() {
  return (
    <div>
     <Router>
      {/* render nav bar here */}
      <NavBar />

      <Routes>
       {/* all routable components here */}

      </Routes>
     </Router>
    </div>
  )
}

export default App
