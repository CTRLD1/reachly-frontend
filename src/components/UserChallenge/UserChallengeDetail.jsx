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

    async function updateStatus(newStatus) {
        try {
            const response = await axios.patch(`${URL}/userchallenges/${userChallengeId}/`, {
                status: newStatus
            })
            console.log(response.data)
            setMessage('Status updated successfuly!✅')
            getUserChallenge()
        } catch (err) {
            console.error('Error updating the status', err)
            setMessage('Failed to update status😔')
        }
    }

    useEffect(() => {
        getUserChallenge()
    }, [])

    return (
        <>
            <div>
                <h2>Challenge Details</h2>
                <p><strong>Challenge:</strong> {userChallenge.challenge}</p>
                <p><strong>Status:</strong> {userChallenge.status_display}</p>
                <p><strong>Date Added:</strong> {userChallenge.date_added}</p>
            </div>

            <div>
                <button onClick={()=>updateStatus('IP')}>Start</button>
                <button onClick={()=>updateStatus('C')}>Complete</button>
            </div>

            {message && <p>{message}</p>}
        </>

    )
}

export default UserChallengeDetail
