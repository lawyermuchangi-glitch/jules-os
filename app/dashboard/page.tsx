'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/auth/login')
      } else {
        setUser(data.user)
      }
    })
  }, [])

  if (!user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-ink">Welcome to JULEX OS</h1>
      <p className="text-gray-500 mt-2">Logged in as: {user.email}</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold">Active Matters</h3>
          <p className="text-2xl font-bold text-ink">0</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold">Total Clients</h3>
          <p className="text-2xl font-bold text-ink">0</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold">AI Credits</h3>
          <p className="text-2xl font-bold text-gilt">KES 0</p>
        </div>
      </div>
    </div>
  )
}
