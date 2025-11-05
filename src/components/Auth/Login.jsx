// ref: cat-collector classwork code
import { useState } from "react"
import axios from "axios"
import { saveTokens, getUserFromToken } from "../../lib/auth"
import { useNavigate } from "react-router"
import Forms from "../ui/Forms"
import Lottie from "lottie-react"
import handwave from '../../assets/handwave.json'

const URL = import.meta.env.VITE_API_URL

export default function Login({ setUser }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${URL}/login/`, { username, password })
      saveTokens(res.data.access, res.data.refresh)
      setUser(getUserFromToken())
      navigate("/challenges")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Forms title='Login' onSubmit={handleSubmit} header={<Lottie animationData={handwave} loop className='w-32 h-32 mx-auto' />}>
      <div className="flex flex-col space-y-4 w-full">
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)} 
          className="w-full p-3 rounded-2xl bg-transparent text-white border-2 border-gray-600 focus:border-blue-500 outline-none"/>

        <input
         type="password"
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 rounded-2xl bg-transparent text-white border-2 border-gray-600 focus:border-blue-500 outline-none"/>
      </div>
      <button type="submit" className="block w-full bg-blue-600 hover:bg-blue-700 mt-4 py-2 rounded-2xl text-white font-semibold">Login</button>
    </Forms>
  )
}