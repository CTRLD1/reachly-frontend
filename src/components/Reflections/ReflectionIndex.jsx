import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { authRequest } from "../../lib/auth"
import ReflectionIndexCard from '../ui/ReflectionIndexCard'

const URL = import.meta.env.VITE_API_URL

function ReflectionIndex({ user }) {

    const [reflections, setReflections] = useState([])
    const [error, setError] = useState(null)

    async function getReflection() {
        try {
            const response = await authRequest({ method: 'get', url: `${URL}/reflections/` })
            console.log(response.data)
            setReflections(response.data)
        } catch (err) {
            console.error('Error fetching reflections', err)
            setError('Failed to load reflections')
        }

    }

    useEffect(() => {
        getReflection()
    }, [])
    console.log(user)


    return (
        <div>
            <h2>My Reflections💭</h2>
            {
                user
                    ?
                    <p>{user}</p>
                    :
                    null
            }
            {
                reflections.length
                    ?
                    <div className='flex flex-wrap justify-center gap-6 p-8 bg-gray-900' >
                        {
                            reflections.map((reflection) => {
                                return (
                                    <Link
                                        key={reflection.id}
                                        to={`/reflections/${reflection.id}`}
                                        className="no-underline"
                                    >
                                        <ReflectionIndexCard
                                            title={reflection.user_challenge_title}
                                            body={`Created at: ${new Date(reflection.created_at).toLocaleString()}`}
                                        />
                                    </Link>
                                )
                            })}
                    </div>



                    :
                    <p>No reflections yet💤</p>

            }
            {error && { error }}
        </div >
    )
}

export default ReflectionIndex
