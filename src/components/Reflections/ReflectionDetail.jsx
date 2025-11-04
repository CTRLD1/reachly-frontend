import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
import ReflectionDetailCard from '../ui/ReflectionDetailCard'


// ref: cat-collector classwork code

const URL = import.meta.env.VITE_API_URL

function ReflectionDetail({ user }) {

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
    <div className='flex flex-col items-center justify-center min-h-screen space-y-6'>
      <div className='flex flex-col items-center'>
      <h2 className='text-3xl font-extrabold text-white mb-6 flex items-center gap-2' >
        Reflection Details<span>✏️</span></h2>
      {
        user
          ?
          <p>{user}</p>
          :
          null
      }
      <ReflectionDetailCard>
        
        <p><strong>Challenge: </strong>{reflection.user_challenge_title}</p>
        <p><strong>Mood: </strong>{moodLabels[reflection.mood]}</p>
        <p><strong>Text: </strong>{reflection.text}</p>
        <div><strong>Created at: </strong>
          {new Date(reflection.created_at).toLocaleString()}
        </div>
        {
          Math.abs(new Date(reflection.updated_at)) - new Date(reflection.created_at) > 1000 && (
            <div>
              <strong>Last update:</strong>
              {new Date(reflection.updated_at).toLocaleString()}
            </div>
          )
        }
      </ReflectionDetailCard>
      </div>
      <div className='mt-4 space-x-4'>
        <Link to={`/reflections/${reflection.id}/edit`}>Edit</Link>

        <button onClick={handleDelete} className='text-text hover:text-[#E74C3C] transition-colors duration-200'>Delete</button>
      </div>


    </div>
  )
}

export default ReflectionDetail
