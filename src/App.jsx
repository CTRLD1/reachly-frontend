import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import NavBar from './components/NavBar/NavBar'
import ChallengeIndex from './components/Challenges/ChallengeIndex'
import ChallengeDetail from './components/Challenges/ChallengeDetail'
import UserChallengeIndex from './components/UserChallenge/UserChallengeIndex'
import UserChallengeDetail from './components/UserChallenge/UserChallengeDetail'
import ReflectionIndex from './components/Reflections/ReflectionIndex'
import ReflectionDetail from './components/Reflections/ReflectionDetail'
import ReflectionForm from './components/Reflections/ReflectionForm'

import Login from './components/Auth/Login'
import { getUserFromToken } from './lib/auth'
import SignUp from './components/Auth/Signup'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import HomePage from './components/HomePage/HomePage'
import ProfilePage from './components/Profile/ProfilePage'


function App() {

  const [user, setUser] = useState(getUserFromToken())

  return (
    <div>
      <Router>
        <NavBar user={user} setUser={setUser} />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/challenges' element={<ChallengeIndex />} />
          <Route path='/challenges/:challengeId' element={<ChallengeDetail />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/signup' element={<SignUp />} />

          {/* the protected routes: */}
          <Route path='/userchallenges'
            element={
              <ProtectedRoute>
                <UserChallengeIndex />
              </ProtectedRoute>
            } />

          <Route path='/userchallenges/:userChallengeId'
            element={
              <ProtectedRoute>
                <UserChallengeDetail />
              </ProtectedRoute>
            } />

          <Route path='/reflections'
            element={
              <ProtectedRoute>
                <ReflectionIndex />
              </ProtectedRoute>
            } />

          <Route path='/reflections/:reflectionId'
            element={
              <ProtectedRoute>
                <ReflectionDetail />
              </ProtectedRoute>
            } />

          <Route path='/reflections/:reflectionId/edit'
            element={
              <ProtectedRoute>
                <ReflectionForm />
              </ProtectedRoute>
            } />

          <Route path='/reflections/new'
            element={
              <ProtectedRoute>
                <ReflectionForm />
              </ProtectedRoute>
            } />

          <Route path='/profile'
            element={
              < ProtectedRoute>
                <ProfilePage user={user} />
              </ProtectedRoute>
            } />
        </Routes>
      </Router>

    </div>

    
  )
}

export default App
