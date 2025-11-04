import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"

const URL = import.meta.env.VITE_API_URL

function ChallengeDetail() {

  const [challenge, setChallenge] = useState({})
  const [message, setMessage] = useState('')
  const { challengeId } = useParams()

  async function getSingleChallenge() {
    try {
      const response = await authRequest({ method: 'get', url: `${URL}/challenges/${challengeId}/` })
      console.log(response.data)
      setChallenge(response.data)
    } catch (err) {
      console.error('Error fetching challenge details', err)
    }

  }

  async function startChallenge() {
    try {
      const response = await authRequest({
        method: 'post', url: `${URL}/userchallenges/`,
        data: {
          challenge: challengeId,
          status: 'P'
        }
      })
      console.log(response.data)
      setMessage('Challenge added successfully! 🥳')
    } catch (err) {
      console.error('Error starting challenge', err)
      setMessage('Failed to start the challenge😔')
    }

  }

  useEffect(() => {
    getSingleChallenge()
  }, [])


  return (
    <div className='flex justify-center items-center min-h-screen bg-[--bg] text-text'>
      <div className='bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center'>
        <div className='grid h-16 w-16 place-items-center mx-auto mb-5 rounded=full bg-sky-500 text-white text-3xl'>
          💪
        </div>
        <h1 className='text-2xl font-bold mb-3 text-gray-800'>{challenge.title}</h1>
        <p className='text-gray-600 mb-6'>{challenge.description}</p>
        <button onClick={startChallenge} className='bg-sky-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-600 transition-all duration-200'>Start Challenge</button>
        {message && <p className='mt-4 text-accent font-bold opacity-0 animate-fadeIn'>{message}</p>}
      </div>
    </div>
  )
}

export default ChallengeDetail
