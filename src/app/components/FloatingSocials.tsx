'use client'

import { useState } from 'react'
import {
  Instagram,
  MessageCircleMore,
  PhoneCall,
  X,
} from 'lucide-react'

export default function FloatingSocials() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {open ? (
        <div className="flex flex-col items-end gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full shadow-lg"
          >
            <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-3 rounded-full shadow-xl">
              <Instagram className="text-white w-5 h-5" />
            </div>
          </a>

          <a
            href="https://m.me"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full shadow-lg"
          >
            <div className="bg-blue-500 p-3 rounded-full shadow-xl">
              <MessageCircleMore className="text-white w-5 h-5" />
            </div>
          </a>

          <a
            href="https://wa.me/51999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full shadow-lg"
          >
            <div className="bg-green-500 p-3 rounded-full shadow-xl">
              <PhoneCall className="text-white w-5 h-5" />
            </div>
          </a>

          <button
            onClick={() => setOpen(false)}
            className="bg-black text-white p-3 rounded-full shadow-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-pink-500 p-4 rounded-full shadow-xl hover:scale-105 transition"
        >
          <MessageCircleMore className="text-white w-5 h-5" />
        </button>
      )}
    </div>
  )
}
