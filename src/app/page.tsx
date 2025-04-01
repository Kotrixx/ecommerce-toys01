'use client'

import { useEffect, useState } from 'react'
import Carousel from '@/components/Carousel'
import HeroSection from '@/components/HeroSection'
import ProductCard from '@/components/ProductCard'

type Producto = {
  id: string
  nombre: string
  precio: number
  oferta: number
  imagen: string
  rating: number
}

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const itemsPerPage = 8

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:8000/v1.0/products?page=${currentPage}&limit=${itemsPerPage}`)
        if (!res.ok) throw new Error('Error al obtener productos')

        const data = await res.json()

        const productosAdaptados: Producto[] = data.items.map((p: any) => ({
          id: p._id,
          nombre: p.name,
          precio: p.price,
          oferta:
            p.is_offer && p.offer_price
              ? Math.round((1 - p.offer_price / p.price) * 100)
              : 0,
          imagen: p.images?.[0] || '',
          rating: 4.8, // Valor ficticio, puedes cambiarlo cuando la API lo tenga
        }))

        setProductos(productosAdaptados)
        setTotalPages(Math.ceil(data.total / data.limit))
        setError(null)
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar los productos. Intenta nuevamente.')
      } finally {
        setLoading(false)
      }
    }

    fetchProductos()
  }, [currentPage])

  return (
    <div>
      <Carousel />
      <HeroSection />

      <section className="py-10 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500 py-10">Cargando productos...</p>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded text-center">{error}</div>
          ) : (
            <>
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {productos.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
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
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
