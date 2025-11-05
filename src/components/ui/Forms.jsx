import React from 'react'

function Forms({ title, subtitle, children, onSubmit }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1015] px-6 sm:px-8">
      <form
        className="bg-[#11161C] p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-md"
        onSubmit={onSubmit}
        autoComplete="on"
      >
        <h1 className="text-white font-bold text-3xl mb-4 text-center">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-400 mb-6 text-center">{subtitle}</p>
        )}
        <div className="flex flex-col space-y-4">{children}</div>
      </form>
    </div>
  )
}

export default Forms
