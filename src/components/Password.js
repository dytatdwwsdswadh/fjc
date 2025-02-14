import React, { useState } from 'react'
import { Pixelify_Sans } from 'next/font/google'

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: '400',
})

const Password = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('')
  const correctPassword = 'mommyissues123'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.toLowerCase() === correctPassword.toLowerCase()) {
      onAuthenticated(true)
    } else {
      alert('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  return (
    <div className={`${pixelifySans.className} min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-red-100 to-pink-100`}>
      <p className="text-2xl text-pink-500 mb-2">Enter the password...</p>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="px-4 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button type="submit" className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
          Unlock
        </button>
      </form>
    </div>
  )
}

export default Password