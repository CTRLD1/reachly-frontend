import React from 'react'
import axios from 'axios'

import { BrowserRouter as Router, Routes, Route } from 'react-router'
import NavBar from './components/NavBar/NavBar'
import ChallengeIndex from './components/Challenges/ChallengeIndex'
import ChallengeDetail from './components/Challenges/ChallengeDetail'
import UserChallengeIndex from './components/UserChallenge/UserChallengeIndex'
import UserChallengeDetail from './components/UserChallenge/UserChallengeDetail'
import ReflectionIndex from './components/Reflections/ReflectionIndex'

const URL = import.meta.env.VITE_API_URL

function App() {
  return (
    <div>
     <Router>
      {/* render nav bar here */}
      <NavBar />

      <Routes>
       {/* all routable components here */}
       <Route path='/challenges' element={<ChallengeIndex />} />
       <Route path='/challenges/:challengeId' element={<ChallengeDetail />} />
       <Route path='/userchallenges' element={<UserChallengeIndex />} />
       <Route path='/userchallenges/:userChallengeId' element={<UserChallengeDetail />} />
       <Route path='reflections/' element={<ReflectionIndex />} />

      </Routes>
     </Router>
    </div>
  )
}

export default App
