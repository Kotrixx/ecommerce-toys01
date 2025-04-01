'use client'

import { useState } from 'react'
import Carousel from '@/components/Carousel'
import HeroSection from '@/components/HeroSection'
import ProductCard from '@/components/ProductCard'

const mockProductos = [
  // 👇 Agrega todos los productos que desees
  {
    id: 1,
    nombre: 'Figura Goku SSJ',
    precio: 120,
    oferta: 20,
    rating: 4.7,
    imagen: 'goku.jpg',
  },
  {
    id: 2,
    nombre: 'Spider-Man Marvel',
    precio: 89,
    oferta: 0,
    rating: 4.5,
    imagen: 'spiderman.jpg',
  },
  {
    id: 3,
    nombre: 'Luffy One Piece',
    precio: 135,
    oferta: 15,
    rating: 4.9,
    imagen: 'luffy.jpg',
  },
  {
    id: 4,
    nombre: 'Batman DC',
    precio: 110,
    oferta: 10,
    rating: 4.6,
    imagen: 'batman.jpg',
  },
  {
    id: 5,
    nombre: 'Naruto Shippuden',
    precio: 100,
    oferta: 5,
    rating: 4.8,
    imagen: 'naruto.jpg',
  },
  {
    id: 6,
    nombre: 'Iron Man Deluxe',
    precio: 150,
    oferta: 0,
    rating: 4.9,
    imagen: 'ironman.jpg',
  },
  // ...agrega más productos
]

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const totalPages = Math.ceil(mockProductos.length / itemsPerPage)
  const indexStart = (currentPage - 1) * itemsPerPage
  const currentItems = mockProductos.slice(indexStart, indexStart + itemsPerPage)

  return (
    <div>
      <Carousel />
      <HeroSection />

      <section className="py-10 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentItems.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-10 gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded text-sm ${
                currentPage === i + 1
                  ? 'bg-pink-500 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </section>
    </div>
  )
}
