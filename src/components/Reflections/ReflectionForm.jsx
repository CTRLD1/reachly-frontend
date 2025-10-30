import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"

// ref: cat-collector classwork code

const URL = import.meta.env.VITE_API_URL

function ReflectionForm() {

    const { reflectionId } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        text: '',
        mood: 'N',
        user_challenge: ''
    })

    const [userChallenges, setUserChallenges] = useState([])

    async function getSingleReflection() {
        const response = await authRequest({method:'get', url:`${URL}/reflections/${reflectionId}/`})
        console.log(response.data)
        setFormData(response.data)
    }

    async function getUserChallenges() {
        try {
            const response = await authRequest({method:'get', url:`${URL}/userchallenges/`})
            setUserChallenges(response.data)
        } catch (err) {
            console.error('Error fetching challenges')
        }

    }

    useEffect(() => {
        if (reflectionId) {
            getSingleReflection()
        }
        getUserChallenges()
    }, [])


    async function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        let response = {}
        try {
            if (reflectionId) {
                response = await authRequest({method:'patch', url:`${URL}/reflections/${reflectionId}/`, data:formData})
            } else {
                response = await authRequest({method:'post', url:`${URL}/reflections/`, data:formData})
            }
            console.log(response)
            if (response.status === 201 || response.status === 200) {
                navigate(`/reflections/${response.data.id}`)
            }

        } catch (err) {
            console.error('Error saving reflection', err.response?.data || err.message)
        }


    }


    return (
        <div>
            <h1>{reflectionId ? `Edit Reflection` : 'Add a New Reflection'} </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='text'>Your Reflection</label>
                    <textarea id='text' name='text' value={formData.text} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor='mood'>Mood</label>
                    <select id='mood' name='mood' value={formData.mood} onChange={handleChange} >
                        <option value='H'>Happy😄</option>
                        <option value='N'>Neutral😐</option>
                        <option value='S'>Sad😔</option>
                    </select>
                </div>

                <div>
                    <label htmlFor='user_challenge'>Select a Challenge</label>
                    <select id='user_challenge' name='user_challenge' value={formData.user_challenge} onChange={handleChange} required>
                        <option value=''>choose a challenge</option>
                        {userChallenges.map(userchallenge => (
                            <option key={userchallenge.id} value={userchallenge.id}>
                                {userchallenge.challenge}
                            </option>
                        ))

                        }
                    </select>
                </div>
                <button type='submit'>submit</button>


            </form>
        </div>
    )
}

export default ReflectionForm
