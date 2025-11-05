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
            <h2 className='text-3xl text-center mb-4 mt-9'>My Reflections💭</h2>
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
                    <>
                        <div className='flex flex-wrap justify-center gap-6 p-8 mb-10' >
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


                    </>
                    :
                    <p className='text-center mt-10 text-gray-300 text-lg'>No reflections yet💤</p>

            }

            <div className='flex justify-center'>
                <Link to='/reflections/new' className='inline-block bg-[#11161C] text-white px-4 py-2 rounded-lg mt-3 hover:bg-[#0D63A5] transition'>
                    ➕ Add Reflection
                </Link>
            </div>

            {error && { error }}
        </div >

    )

}

export default ReflectionIndex