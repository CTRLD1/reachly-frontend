import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router'

// ref: cat-collector classwork code

const URL = import.meta.env.VITE_API_URL

function ReflectionDetail() {

  const { reflectionId } = useParams()
  const [reflection, setReflection] = useState({})
  const [error, setError] = useState(null)


  const moodLabels = {
    H: 'Happy😄',
    N: 'Neutral😐',
    S: 'Sad😔'
  }

  async function getSingleReflection() {
    try {
      const response = await axios.get(`${URL}/reflections/${reflectionId}/`)
      console.log(response.data)
      setReflection(response.data)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch reflection details')
    }

  }

  useEffect(() => {
    getSingleReflection()
  }, [])

  if (error) {
    return <h3>{error}</h3>
  }

  return (
    <div>
      <h2>Reflection Details💭</h2>
      <p><strong>Challenge: </strong>{reflection.challenge_title}</p>
      <p><strong>Mood: </strong>{moodLabels[reflection.mood]}</p>
      <p><strong>Text: </strong>{reflection.text}</p>
      <p><strong>Created at: </strong>
        {new Date(reflection.created_at).toLocaleString()}
      </p>
      {
        Math.abs(new Date(reflection.updated_at)) - new Date(reflection.created_at) > 1000 && (
          < p >
            <strong>Last update:</strong> {new Date(reflection.updated_at).toLocaleString()}
          </p >
        )
      }

      <Link to={`/reflections/${reflection.id}/edit`}>Edit Reflection</Link>

    </div>
  )
}

export default ReflectionDetail
