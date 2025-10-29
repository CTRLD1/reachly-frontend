import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router'

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
        <div>
         <h2>All Challenges</h2>
         {
            challenges.length
            ?
            challenges.map((challenge)=>{
                return (
                    <Link to={`/challenges/${challenge.id}`}>
                        <p>{challenge.title}</p>
                    </Link>
                )
            })
            :
            <h2>No challenges yet</h2>
         }
    
        </div>
    )
}

export default ChallengeIndex
