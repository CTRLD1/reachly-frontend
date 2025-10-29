import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const URL = import.meta.env.VITE_API_URL

function UserChallengeDetail() {

    const { userChallengeId } = useParams()
    const [userChallenge, setUserChallenge] = useState({})
    const [message, setMessage] = useState('')

    async function getUserChallenge() {
        try {
            const response = await axios.get(`${URL}/userchallenges/${userChallengeId}/`)
            console.log(response.data)
            setUserChallenge(response.data)
        } catch (err) {
            console.error('Error fetching user challenge details', err)
        }

    }

    useEffect(() => {
        getUserChallenge()
    }, [])

    return (
        <div>
            <h2>Challenge Details</h2>
            <p><strong>Challenge:</strong> {userChallenge.challenge}</p>
            <p><strong>Status:</strong> {userChallenge.status_display}</p>
            <p><strong>Date Added:</strong> {userChallenge.date_added}</p>


        </div>
    )
}

export default UserChallengeDetail
