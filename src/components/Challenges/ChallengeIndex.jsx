import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import HoverCard from '../ui/HoverCard'

const URL = import.meta.env.VITE_API_URL

function ChallengeIndex() {

    const [challenges, setChallenges] = useState([])

    async function getChallenges() {
        try {
            const response = await axios.get(`${URL}/challenges/`)
            console.log(response.data)
            setChallenges(response.data)
        } catch (err) {
            console.error('Error fetching challenges', err)
        }

    }

    useEffect(() => {
        getChallenges()
    }, [])

    return (
        <div className='p-8 bg-bg min-h-screen text-text'>
            <h2 className='text-3xl text-center mb-4 mt-3'>All Challenges</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    challenges.length
                        ?
                        challenges.map((challenge) => {
                            return (
                                // <Link to={`/challenges/${challenge.id}`}>
                                    <HoverCard 
                                    title = {challenge.title}
                                    id= {challenge.id}
                                    />
                                    
                                // </Link>
                            )
                        })
                        :
                        <h2>No challenges yet</h2>
                }
            </div>
        </div>
    )
}

export default ChallengeIndex
