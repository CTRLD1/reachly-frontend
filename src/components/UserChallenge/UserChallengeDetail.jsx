import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { authRequest} from "../../lib/auth"
import ReactConfetti from 'react-confetti'
import UserChallengeDetailCard from '../ui/UserChallengeDetailCard'

const URL = import.meta.env.VITE_API_URL

function UserChallengeDetail() {

    const { userChallengeId } = useParams()
    const [userChallenge, setUserChallenge] = useState({})
    const [message, setMessage] = useState('')

    // ref for react confetti effect: https://github.com/alampros/react-confetti
    const [showConfetti, setShowConfetti] = useState(false)

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
            const response = await authRequest({
                method: 'patch', url: `${URL}/userchallenges/${userChallengeId}/`,
                data: { status: newStatus }
            })
            console.log(response.data)

            await getUserChallenge()

            if (newStatus === 'IP') {
                setMessage('Challenge is now in progress, you got this buddy💪🏽')

            } else if (newStatus === 'C') {
                setMessage('Congrats! you did it!🥳')
                setShowConfetti(true)
                setTimeout(() => setShowConfetti(false), 5000)

            } else if (newStatus == 'P')
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
            {showConfetti && <ReactConfetti numberOfPieces={400} gravity={0.2} recycle={false} width={window.innerWidth} height={window.innerHeight} />}

            {/* <h2>Challenge Details</h2> */}
            <UserChallengeDetailCard
                date={userChallenge.date_added}
                title={userChallenge.challenge_title}
                status={userChallenge.status_display}

            >

                <div className='flex flex-col items-center justify-center text-center space-y-2 mt-3'>
                    <p className='text-3xl'>

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

                </div>

                <div>
                    {
                        userChallenge.status === 'P'
                            ?
                            <button onClick={() => updateStatus('IP')} className='challenge-btn'>start challenge</button>
                            :
                            userChallenge.status === 'IP'
                                ?
                                <button onClick={() => updateStatus('C')} className='challenge-btn'>mark as completed</button>
                                :
                                userChallenge.status === 'C'
                                    ?
                                    <button onClick={() => updateStatus('P')} className='challenge-btn'>do it again!</button>
                                    :
                                    null

                    }


                </div>

                {message && <p className='text-gray-700 font-semibold text-sm'>{message}</p>}

            </UserChallengeDetailCard>

        </>


    )
}

export default UserChallengeDetail
