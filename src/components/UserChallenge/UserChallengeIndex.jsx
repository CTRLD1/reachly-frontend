import { useEffect, useState } from 'react'
import axios from 'axios'

const URL = import.meta.env.VITE_API_URL

function UserChallengeIndex() {
    const [userChallenges, setUserChallenges] = useState([])
    const [error, setError] = useState(null)

    async function getUserChallenges() {
        try {
            const response = await axios.get(`${URL}/userchallenges/`)
            console.log(`User Challenges: ${response.data}`)
            setUserChallenges(response.data)
        } catch (err) {
            console.error('Error fetching user challenges', err)
            setError('Failed to fetch user challenges')
        }

    }

    useEffect(() => {
        getUserChallenges()
    }, [])

    return (
        <div>
            <h2>My Challenges:</h2>
            {
                userChallenges.length
                    ?
                    userChallenges.map((userChallenge) => {
                        return (
                            <>
                                <p><strong>Challenge:</strong> {userChallenge.challenge}</p>
                                <p><strong>Status:</strong> {userChallenge.status_display}</p>
                                <p><strong>Date Added:</strong> {userChallenge.date_added}</p>
                            </>
                        )
                    })
                    :
                    <p>No challenges yet</p>



            }
        </div>
    )
}

export default UserChallengeIndex
