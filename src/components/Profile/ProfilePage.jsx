import { useState, useEffect } from 'react'
import { authRequest } from '../../lib/auth'
import  UserProgressChart from './UserProgressChart'

const URL = import.meta.env.VITE_API_URL

function ProfilePage() {

    const [profile, setProfile] = useState({})
    const [errors, setErrors] = useState(null)

    async function getProfile() {
        try {
            const response = await authRequest({ method: 'get', url: `${URL}/profile/` })
            setProfile(response.data)
        } catch (err) {
            console.error('Error fetching profile:', err)
            setErrors('Failed to load profile info')
        }

    }

    useEffect(() => {
        getProfile()
    }, [])

    if (errors)
        return <p>{errors}</p>

    return (
        <div>
            <h2>My Profile</h2>
            <p><strong>Full Name: </strong>{profile.first_name} {profile.last_name}</p>
            <p><strong>Email: </strong>{profile.email}</p>
            <p><strong>Username: </strong>{profile.username}</p>

            <UserProgressChart />

        </div>
    )
}

export default ProfilePage
