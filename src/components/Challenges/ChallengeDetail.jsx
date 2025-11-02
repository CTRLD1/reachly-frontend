import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
import { Button } from '../ui/button'

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
    <div>
      <h1>{challenge.title}</h1>
      <p>{challenge.description}</p>

      <button className='bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transitio' onClick={startChallenge}>Start Challenge</button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default ChallengeDetail
