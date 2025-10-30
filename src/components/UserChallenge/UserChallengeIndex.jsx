import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"


const URL = import.meta.env.VITE_API_URL

function UserChallengeIndex({ user }) {
    const [userChallenges, setUserChallenges] = useState([])
    const [error, setError] = useState(null)

    async function getUserChallenges() {
        try {
            const response = await authRequest({ method: 'get', url: `${URL}/userchallenges/` })
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
    console.log(user)

    return (
        <div>
            <h2>My Challenges:</h2>
            {
                user
                    ?
                    <p>{user}</p>
                    :
                    null
            }
            {
                userChallenges.length
                    ?
                    userChallenges.map((userChallenge) => {
                        return (
                            <>
                                <Link to={`/userchallenges/${userChallenge.id}`}>
                                    <p><strong>Challenge:</strong> {userChallenge.challenge_title}</p>
                                </Link>


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