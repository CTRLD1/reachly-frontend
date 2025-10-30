import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"


// ref: cat-collector classwork code

const URL = import.meta.env.VITE_API_URL

function ReflectionDetail({user}) {

  const { reflectionId } = useParams()
  const [reflection, setReflection] = useState({})
  const [errors, setErrors] = useState(null)
  const navigate = useNavigate()


  const moodLabels = {
    H: 'Happy😄',
    N: 'Neutral😐',
    S: 'Sad😔'
  }

  async function getSingleReflection() {
    try {
      const response = await authRequest({ method: 'get', url: `${URL}/reflections/${reflectionId}/` })
      console.log(response.data)
      setReflection(response.data)
    } catch (err) {
      console.error(err)
      setErrors('Failed to fetch reflection details')
    }

  }

  // delete function ref: my django-rest-framework Lab (pokemon-collector) bonus excercise 
  // confirm delete ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm



  async function handleDelete() {
    try {
      const response = await authRequest({ method: 'delete', url: `${URL}/reflections/${reflectionId}/` })
      console.log(response)
      console.log(`${reflection.text} has been deleted successfuly`)
      navigate('/reflections')
    } catch (err) {
      console.log(err)
      setErrors(err.response.data.err)
    }

  }

  useEffect(() => {
    getSingleReflection()
  }, [])

  if (errors) {
    return <h3>{errors}</h3>
  }

  return (
    <div>
      <h2>Reflection Details💭</h2>
      {
        user
          ?
          <p>{user}</p>
          :
          null
      }
      <p><strong>Challenge: </strong>{reflection.user_challenge_title}</p>
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

      <button onClick={handleDelete}>Delete Reflection</button>

    </div>
  )
}

export default ReflectionDetail
