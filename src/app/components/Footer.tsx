'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Youtube,
  MessageCircleMore,
  PhoneCall,
  X,
} from 'lucide-react'

export default function Footer() {
  const [openSocials, setOpenSocials] = useState(false)

  return (
    <footer className="relative bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Logo y descripción */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-pink-400">One Store</h2>
          <p className="text-sm">
            Colecciona sin límites. Figuras de acción de anime, superhéroes y cultura pop.
          </p>
        </div>

        {/* Horarios + redes centrales */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">HORARIOS DE ATENCIÓN:</h3>
          <p className="text-sm">Lunes a Sábado: 10:00 a 21:00 hrs (UTC -5)</p>
          <p className="text-sm">Domingos y Feriados: 11:00 a 20:00 hrs</p>
          <div className="border-t border-b border-pink-500 py-2 flex justify-center gap-5">
            <Facebook className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
            <Youtube className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
            <PhoneCall className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
          </div>
        </div>

        {/* Enlaces de ayuda */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">ENLACES DE AYUDA</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/politicas">Políticas y Privacidad</Link></li>
            <li><Link href="/terminos">Términos y Condiciones</Link></li>
            <li><Link href="/reclamos">Libro de Reclamaciones</Link></li>
          </ul>
        </div>
      </div>

      <hr className="my-6 border-gray-600" />
      <p className="text-center text-xs text-gray-400">
        © 2025 One Store. Todos los derechos reservados.
      </p>

      {/* Botón flotante de redes sociales */}
      <div className="fixed right-4 bottom-4 z-50">
        {/* Botón para abrir/cerrar redes */}
        {openSocials ? (
          <div className="bg-zinc-900 p-4 rounded-xl shadow-lg space-y-3 transition-all duration-300">
            <div className="flex justify-end">
              <button
                onClick={() => setOpenSocials(false)}
                className="bg-white text-black p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <div className="bg-pink-500 p-2 rounded-full hover:scale-105 transition">
                <Instagram className="text-white w-5 h-5" />
              </div>
            </a>
            <a href="https://m.me" target="_blank" rel="noopener noreferrer">
              <div className="bg-blue-500 p-2 rounded-full hover:scale-105 transition">
                <MessageCircleMore className="text-white w-5 h-5" />
              </div>
            </a>
            <a href="https://wa.me/51999999999" target="_blank" rel="noopener noreferrer">
              <div className="bg-green-500 p-2 rounded-full hover:scale-105 transition">
                <PhoneCall className="text-white w-5 h-5" />
              </div>
            </a>
          </div>
        ) : (
          <button
            onClick={() => setOpenSocials(true)}
            className="bg-pink-500 p-3 rounded-full hover:scale-105 transition"
            aria-label="Redes sociales"
          >
            <MessageCircleMore className="text-white w-5 h-5" />
          </button>
        )}
      </div>
    </footer>
  )
}
