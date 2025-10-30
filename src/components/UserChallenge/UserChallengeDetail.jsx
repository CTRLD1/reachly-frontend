import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"

const URL = import.meta.env.VITE_API_URL

function UserChallengeDetail() {

    const { userChallengeId } = useParams()
    const [userChallenge, setUserChallenge] = useState({})
    const [message, setMessage] = useState('')

    async function getUserChallenge() {
        try {
            const response = await authRequest({ method: 'get', url: `${URL}/userchallenges/${userChallengeId}/` })
            console.log(response.data)
            setUserChallenge(response.data)
        } catch (err) {
            console.error('Error fetching user challenge details', err)
        }
    }

    async function updateStatus(newStatus) {
        try {
            const response = await authRequest({method:'patch', url:`${URL}/userchallenges/${userChallengeId}/`, 
                data: {status: newStatus}
            })
            console.log(response.data)
            setMessage('Status updated successfuly!✅')

            await getUserChallenge()

            if (newStatus === 'IP')
                setMessage('Challenge is now in progress, you got this!💪🏽')
            else if (newStatus === 'C')
                setMessage('Congrats! you did it!🥳')
            else if (newStatus == 'P')
                setMessage('Challenge is reset to pending')

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
                <p><strong>Challenge:</strong> {userChallenge.challenge_title}</p>
                <p><strong>Status:</strong> {userChallenge.status_display}</p>
                <p><strong>Date Added:</strong> {userChallenge.date_added}</p>
            </div>
            

            <p>
                
                {
                    userChallenge.status === 'P'
                        ?
                        '🤔'
                        :
                        userChallenge.status === 'IP'
                            ?
                            '⏱️'
                            :
                            userChallenge.status === 'C'
                                ?
                                '😎'
                                :
                                '❓'
                }
            </p>

            <div>
                {
                    userChallenge.status === 'P'
                        ?
                        <button onClick={() => updateStatus('IP')}>start challenge</button>
                        :
                        userChallenge.status === 'IP'
                            ?
                            <button onClick={() => updateStatus('C')}>mark as completed</button>
                            :
                            userChallenge.status === 'C'
                                ?
                                <button onClick={() => updateStatus('P')}>do it again!</button>
                                :
                                null

                }


            </div>

            {message && <p>{message}</p>}
        </>

    )
}

export default UserChallengeDetail
