'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set fecha de finalización (ajústala según tu campaña)
  const deadline = new Date('2025-04-01T23:59:59')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = deadline.getTime() - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-pink-600 text-white py-2 px-4 flex flex-col md:flex-row items-center justify-center gap-4 z-40 shadow-md">
      <p className="text-sm font-medium text-center">
        🕒 ¡Preventa activa! Reserva tus figuras antes de que se agoten:
      </p>
      <div className="flex items-center gap-3 font-bold tracking-wide text-sm">
        <span>{timeLeft.days}d</span>
        <span>{timeLeft.hours}h</span>
        <span>{timeLeft.minutes}m</span>
        <span>{timeLeft.seconds}s</span>
      </div>
      <Link
        href="/preventa"
        className="text-sm bg-white text-pink-600 font-semibold px-3 py-1 rounded hover:bg-pink-100 transition"
      >
        Ver artículos en preventa
      </Link>
    </div>
  )
}
