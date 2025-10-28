import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

const URL = import.meta.env.VITE_API_URL

function ChallengeDetail() {

  const [challenge, setChallenge] = useState({})
  const [message, setMessage] = useState('')
  const { challengeId } = useParams()

  async function getSingleChallenge() {
    try {
      const response = await axios.get(`${URL}/challenges/${challengeId}/`)
      console.log(response.data)
      setChallenge(response.data)
    } catch (err) {
      console.error('Error fetching challenge details', err)
    }

  }

  async function startChallenge() {
    try {
      const response = await axios.post(`${URL}/userchallenges/`, {
        user : 1,
        challenge: challengeId,
        status: 'P'
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
      <h1>{ challenge.title }</h1>
      <p>{challenge.description}</p>

      <button onClick={startChallenge}>Start Challenge</button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default ChallengeDetail
