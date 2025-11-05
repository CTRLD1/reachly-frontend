import React from 'react'
import Lottie from 'lottie-react'
import HandwrittenWelcome from '../../assets/HandwrittenWelcome.json'
import { Link } from 'react-router'



function HomePage() {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-linear-to-b from-[#0B1015] to-[#1A1F25] text-white text-center px-4'>
            <div className='mb-6'>
                <Lottie animationData={HandwrittenWelcome} loop={true} className='w-64 md:w-80 mx-auto' />
                <h2 className='text-3xl font-bold mt-4'>to Reachly</h2>

                <p className='text-gray-300 mt-3 max-w-md'>where every challenge helps you reflect, grow, and reach beyond comfort💪</p>

            </div>
            <p className='text-amber-500'>ready to change?</p>

            <Link to='/signup' className='mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300'>
                Sign up now!
            </Link>

        </div>

    )
}

export default HomePage
