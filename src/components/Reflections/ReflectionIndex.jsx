import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router'

const URL = import.meta.env.VITE_API_URL

function ReflectionIndex() {

    const [reflections, setReflections] = useState([])
    const [error, setError] = useState(null)

    async function getReflection() {
        try {
            const response = await axios.get(`${URL}/reflections/`)
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


    return (
        <div>
            <h2>My Reflections💭</h2>
            {
                reflections.length
                    ?
                    reflections.map((reflection) => {
                        return (
                            <>
                                <Link
                                    to={`/reflections/${reflection.id}`}>
                                    <p>
                                        <strong>Challenge: </strong>
                                        {reflection.challenge_title}
                                    </p>
                                </Link>
                                <p><strong>Mood:</strong> {reflection.mood_display}</p>
                                <p><strong>Created at: </strong>
                                    {new Date(reflection.created_at).toLocaleString()}
                                </p>
                                {
                                    Math.abs(new Date(reflection.updated_at)) - new Date(reflection.created_at) > 1000 && (
                                        < p >
                                            <strong>Last update:</strong> {new Date(reflection.updated_at).toLocaleString()}
                                        </p >
                                    )
                                }

                                {/* 
                                 resources i used for the DateTime and the difference between created_at & updated_at: 
                                 1-https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
                                 2-https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
                                 3-https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#using_date_objects_in_arithmetic_operations
                                */}

                            </>


                        )
                    })
                    :
                    <p>No reflections yet💤</p>
            }

            {error && { error }}
        </div >
    )
}

export default ReflectionIndex
