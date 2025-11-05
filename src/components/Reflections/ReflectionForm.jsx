import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
import Forms from '../ui/Forms'

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
        const response = await authRequest({ method: 'get', url: `${URL}/reflections/${reflectionId}/` })
        console.log(response.data)
        setFormData(response.data)
    }

    async function getUserChallenges() {
        try {
            const response = await authRequest({ method: 'get', url: `${URL}/userchallenges/` })
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
                response = await authRequest({ method: 'patch', url: `${URL}/reflections/${reflectionId}/`, data: formData })
            } else {
                response = await authRequest({ method: 'post', url: `${URL}/reflections/`, data: formData })
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
            <Forms onSubmit={handleSubmit}>

                <div className='flex flex-col space-y-1'>
                    <label htmlFor='user_challenge' className='text-gray-300 text-sm'>Select a Challenge</label>
                    <select id='user_challenge' name='user_challenge' value={formData.user_challenge} onChange={handleChange} required className='w-full p-3 rounded-xl bg-transparent text-white border-2 border-gray-600 focus:border-blue-500 outline-none'>
                        <option value=''>choose a challenge</option>
                        {userChallenges.map(userchallenge => (
                            <option key={userchallenge.id} value={userchallenge.id}>
                                {userchallenge.challenge_title}
                            </option>
                        ))

                        }
                    </select>
                </div>

                <div className='flex flex-col space-y-1 mt-4'>
                    <label htmlFor='mood' className='text-gray-300 text-sm'>Mood</label>
                    <select id='mood' name='mood' value={formData.mood} onChange={handleChange} className='w-full p-3 rounded-xl bg-transparent text-white border-2 border-gray-600 focus:border-blue-500 outline-none' >
                        <option value='H'>Happy😄</option>
                        <option value='N'>Neutral😐</option>
                        <option value='S'>Sad😔</option>
                    </select>
                </div>

                <div className='flex flex-col space-y-1 mt-4'>
                    <label htmlFor='text' className='text-gray-300 text-sm'>Your Reflection</label>
                    <textarea id='text' name='text' value={formData.text} onChange={handleChange} required className='w-full p-3 rounded-xl bg-transparent text-white border-2 border-gray-600 focus:border-blue-500 outline-none min-h-[120px]' />
                </div>

                <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-2xl text-white font-semibold transition duration-200 mt-3'>submit</button>


            </Forms>
        </div>
    )
}

export default ReflectionForm
