'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/login') // go to login instead of /search
  }, [router])

  return <p className="text-center">Redirecting to login...</p>
}
