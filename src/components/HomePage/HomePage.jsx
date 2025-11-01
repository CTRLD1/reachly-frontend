import React from 'react'
import Lottie from 'lottie-react'
import HandwrittenWelcome from '../../assets/Handwritten Welcome.json'
import { Link } from 'react-router'



function HomePage({ user }) {
    return (
        <div>
            <div>
                <Lottie animationData={HandwrittenWelcome} loop={true} style={{ width: 350, margin: '0 auto' }} />
                <h2>to Reachly</h2>
            </div>
            {
                user
                    ?
                    (
                        <>
                            <h1>Welcome back, {user.username}!</h1>
                            <p>continue your reachly jpurny of daily challenges and reflections!</p>
                            <Link to='/userchallenges'>View My Challenges</Link>
                        </>
                    )
                    :
                    (
                        <>
                            {/* <h2>hey new</h2> */}
                        </>
                    )

            }

        </div>

    )
}

export default HomePage
