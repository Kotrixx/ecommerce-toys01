'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingSocials from './FloatingSocials'
import CountdownBanner from './CountdownBanner'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <CountdownBanner />}
      {children}
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingSocials />}
    </>
  )
}
