// ref: cat-collector classwork code
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Forms from '../ui/Forms'
import handwave from '../../assets/handwave.json'
import Lottie from 'lottie-react'

const URL = import.meta.env.VITE_API_URL

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${URL}/signup/`, { username, password, email, first_name, last_name })
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert('Signup failed')
    }
  }

  return (
    <div className='flex flex-col itms-center justify-center min-h-screen'>
    
      <Forms title='Sign Up' onSubmit={handleSubmit} header={<Lottie animationData={handwave} loop className='w-32 h-32 mx-auto' />}>
        <div className="flex flex-col space-y-4 w-full">
          <input
            placeholder="First Name"
            className="w-full p-3 rounded-2xl bg-transparent text-white border-2 border-gray-600 focus:border-blue-500 outline-none"
            value={first_name}
            onChange={e => setFirstName(e.target.value)}
          />

          <input
            placeholder="Last Name"
            className="w-full p-3 rounded-2xl bg-transparent text-white border-2 border-gray-600 focus:border-blue-500 outline-none"
            value={last_name}
            onChange={e => setLastName(e.target.value)}
          />

          <input
            placeholder="Username"
            className="w-full p-3 rounded-2xl bg-transparent text-white border-2 border-gray-600 focus:border-blue-500 outline-none"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            placeholder="Email"
            className="w-full p-3 rounded-2xl bg-transparent text-white border-2 border-gray-600 focus:border-blue-500 outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-2xl bg-transparent text-white border-2 border-gray-600 focus:border-blue-500 outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='block w-full bg-blue-600 hover:bg-blue-700 mt-4 py-2 rounded-2xl text-white font-semibold'>Sign Up</button>
      </Forms>
    </div>
  )
}