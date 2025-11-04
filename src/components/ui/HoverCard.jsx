import React from 'react'
import { Link } from 'react-router';
// ref: https://play.tailwindcss.com/eCfibrSI2X 
function HoverCard({ title, id }) {
    return (
        <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 rounded-xl shadow-md ring-1 ring-gray-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">


            <span className="absolute top-10 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-sky-500 transition-all duration-500 group-hover:scale-[10] group-hover:opacity-80"></span>


            <div className="relative z-10 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-sky-500 text-white mx-auto mb-6 text-2xl transition-all duration-500 group-hover:bg-sky-400">
                    💪
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2 transition-all duration-300 group-hover:text-white">
                    {title}
                </h3>

                <p className="text-gray-500 mb-1 transition-all duration-300 group-hover:text-white/90"></p>

                <p className="text-gray-500 mb-4 transition-all duration-300 group-hover:text-white/80"> </p>

                <Link
                    to={`/challenges/${id}`}
                    className="text-sky-500 hover:text-sky-700 font-semibold transition"
                >
                    View Details →
                </Link>
            </div>
        </div>
    );
}

export default HoverCard;