import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
import UserChallengeCard from '../ui/UserChallengeCard'


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
        <div className='p-6' >
            <h2 className='text-xl font-bold mb-6'>My Challenges:</h2>
            {
                user
                    ?
                    <p>{user}</p>
                    :
                    null
            }
            {
                userChallenges.length ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {userChallenges.map((userChallenge) => (
                            <UserChallengeCard
                                id={userChallenge.id}
                                title={userChallenge.challenge_title}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No challenges yet</p>
                )
            }


        </div>
    )
}

export default UserChallengeIndex