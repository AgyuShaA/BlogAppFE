'use client'

import { useRouter } from '@/i18n/navigation'
import { useState } from 'react'

export default function AdminAuthPage() {
  const [password, setPassword] = useState('')
  const router = useRouter()

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('/api/admin-login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.replace('/admin') // or /en/panel based on locale
    } else {
      alert('Wrong password')
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <form onSubmit={submit} className='bg-white p-6 rounded shadow w-80 space-y-4'>
        <h2 className='text-xl font-bold text-center'>Admin Access</h2>

        <input
          type='password'
          placeholder='Enter password'
          className='w-full border px-3 py-2 rounded'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit' className='w-full bg-black text-white py-2 rounded'>
          Login
        </button>
      </form>
    </div>
  )
}
