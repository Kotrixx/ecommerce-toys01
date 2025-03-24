'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import CountdownBanner from './CountdownBanner'

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false) // bajando
      } else {
        setShowNavbar(true) // subiendo
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Barra superior */}
      <div className="bg-gradient-to-r from-black via-black to-purple-800 text-white px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
        <Link href="/" className="flex items-center gap-4 text-xl font-bold">
          <img src="/img/logo3_1.png" alt="Logo" className="h-10" />
          <span className="text-white tracking-wide">
            ONE <span className="text-pink-400">STORE</span>
          </span>
        </Link>

        {/* Buscador */}
        <div className="flex w-full md:w-1/2 max-w-xl">
          <input
            type="text"
            placeholder="Buscar figuras de anime, Marvel, etc..."
            className="w-full px-5 py-2 text-gray-800 bg-white rounded-l-md border border-gray-300 focus:outline-none"
          />
          <button className="bg-pink-500 text-white px-4 py-2 rounded-r-md border border-l-0 border-gray-300 hover:bg-pink-600 transition">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Login */}
        <Link
          href="/login"
          className="border border-white px-5 py-2 rounded hover:bg-white hover:text-black transition text-sm"
        >
          Iniciar sesión
        </Link>
      </div>

      {/* Barra inferior */}
      <div className="bg-gray-100 px-8 py-4 flex justify-center items-center text-gray-700 text-sm font-medium border-t border-b space-x-8">
        <Link href="/" className="hover:text-pink-600">Home</Link>
        <Link href="/categorias/anime" className="hover:text-pink-600">Anime</Link>
        <Link href="/categorias/superheroes" className="hover:text-pink-600">Superhéroes</Link>
        <Link href="/categorias/novedades" className="hover:text-pink-600">Novedades</Link>
        <Link href="/categorias/exclusivos" className="hover:text-pink-600">Exclusivos</Link>
      </div>

      {/* Banner de preventa */}
      <CountdownBanner />
    
    </div>
  )
}
