import React from 'react'

// src: https://www.creative-tim.com/twcomponents/component/simple-card-6

function UserChallengeDetailCard({ title, status, date, children }) {
  return (
    <main className="grid min-h-screen w-full place-items-center bg-gray-900 relative">
      <div className="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-2xl bg-gray-400"></div>

      <div className="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2 rotate-6 space-y-4 rounded-2xl bg-gray-100 p-6 transition duration-300 hover:rotate-0 flex flex-col justify-between items-center text-center overflow-hidden">
        <div className="flex justify-end w-full">
          <div className="h-4 w-4 rounded-full bg-gray-900"></div>
        </div>

        <header className="text-xl font-extrabold text-gray-600">{date}</header>

        <div>
          <p className="text-4xl font-extrabold text-gray-900 wrap-break-word">{title}</p>
          <p className="text-3xl font-extrabold text-[#FE5401]">{status}</p>
        </div>

        <div className="flex flex-col items-center gap-2 w-full">
          {children}
        </div>
      </div>
    </main>
  )
}

export default UserChallengeDetailCard
