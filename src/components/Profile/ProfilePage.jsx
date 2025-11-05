import { useState, useEffect } from 'react'
import { authRequest, clearTokens } from '../../lib/auth'
import { useNavigate } from 'react-router'
import UserProgressChart from './UserProgressChart'
import Deletebttn from '../ui/deletebttn'


const URL = import.meta.env.VITE_API_URL

function ProfilePage() {

    const [profile, setProfile] = useState({})
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate()

    async function getProfile() {
        try {
            const response = await authRequest({ method: 'get', url: `${URL}/profile/` })
            setProfile(response.data)
        } catch (err) {
            console.error('Error fetching profile:', err)
            setErrors('Failed to load profile info')
        }

    }

    // to delete user account
    async function handleAccountDelete() {
        const confirmDelete = window.confirm('Are you sure you want to delete your account?')
        if (!confirmDelete)
            return
        try {
            const response = await authRequest({ method: 'delete', url: `${URL}/profile/delete-user/` })
            alert(response.data.message)
            clearTokens()
            navigate('/signup')
        } catch (err) {
            console.error('Error deleting account', err)
            setErrors('Failed to delete account')
        }

    }

    useEffect(() => {
        getProfile()
    }, [])

    if (errors)
        return <p>{errors}</p>

    return (
        <div className='flex flex-col items-center justify-center min-h-screen text-white px-4'>
            <h2 className='text-3xl font-bold mb-6 text-current'>My Profile👤</h2>
            <div className=' p-6 rounded-xl shadow-md w-full max-w-md text-left space-y-3 border border-gray-700'>

                <p><strong>Full Name: </strong>{profile.first_name} {profile.last_name}</p>
                <p><strong>Email: </strong>{profile.email}</p>
                <p><strong>Username: </strong>{profile.username}</p>

                {/* to disply the progress chart in src/ui in the user profile */}
                <UserProgressChart />
            </div>


            <Deletebttn onClick={handleAccountDelete} />

        </div>
    )
}

export default ProfilePage
