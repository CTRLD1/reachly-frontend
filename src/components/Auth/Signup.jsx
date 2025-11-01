// ref: cat-collector classwork code
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

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
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input placeholder='FirstName' value={first_name} onChange={e => setFirstName(e.target.value)} />
      <input placeholder='LastName' value={last_name} onChange={e => setLastName(e.target.value)} />
      <input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
      <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
      <button type='submit'>Sign Up</button>
    </form>
  )
}