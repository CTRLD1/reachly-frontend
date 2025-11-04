import React from 'react'
import { Link } from 'react-router'
// src: https://tailwindflex.com/@prajwal/feature-card#google_vignette

function UserChallengeCard({ emoji = "🚀", title, id}) {
    return (
        <div className='relative cursor-pointer w-full max-w-sm'>
            <span className='absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-200 rounded-lg'></span>
            <div className='relative p-6 bg-white border-2 border-[#249ED] rounded-lg shadow-md hover:scale-105 transition-transform duration-500 h-[150px] flex flex-col justify-between'>
                <div className='flex items-center justify-between w-full'>
                    <span className='text-2xl'>{emoji}</span>
                    <h3 className='ml-3 text-lg font-bold text-gray-800'>{title}</h3>
                </div>
                <Link to={`/userchallenges/${id}`} className='inline-block bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#1b82d1] transition duration-300'>
                        View Details →
                    </Link>

            </div>

        </div>
    )
}

export default UserChallengeCard
