'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Producto = {
  id: string
  nombre: string
  precio: number
  oferta: number
  imagen: string
}

export default function ListaProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const limit = 8

    fetch(`http://localhost:8000/v1.0/products/all?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text())
        return res.json()
      })
      .then((data) => {
        const productosAdaptados = data.products.map((p: any) => ({
          id: p.id,
          nombre: p.name,
          precio: parseFloat(p.precio),
          oferta: p.oferta,
          imagen: p.images || '',
        }))
        setProductos(productosAdaptados)
        setTotalPages(Math.ceil(data.total_products / data.limit))
      })
      .catch((err) => {
        console.error(err)
        setError('No se pudieron cargar los productos. Verifica tu conexión o vuelve a intentarlo.')
      })
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link
          href="/admin/gestion/productos/new"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          + Agregar producto
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-600">Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-xl font-semibold mb-2">¡Ocurrió un error!</h2>
            <p className="text-base">{error}</p>
          </div>
        </div>
      ) : productos.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg italic">No hay productos registrados.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productos.map((p) => (
              <div key={p.id} className="bg-white rounded shadow p-4 space-y-2">
                <div className="relative">
                  {p.oferta > 0 && (
                    <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full z-10">
                      {p.oferta}% OFF
                    </span>
                  )}
                  <img
                    src={p.imagen}
                    className="w-full h-48 object-cover rounded"
                    alt={p.nombre}
                  />
                </div>

                <h3 className="text-lg font-bold">{p.nombre}</h3>

                {p.oferta > 0 ? (
                  <div>
                    <p className="text-sm text-gray-400 line-through">
                      S/ {p.precio.toFixed(2)}
                    </p>
                    <p className="text-lg text-pink-600 font-bold">
                      S/ {(p.precio * (1 - p.oferta / 100)).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-700 text-lg font-semibold">
                    S/ {p.precio.toFixed(2)}
                  </p>
                )}

                <div className="flex gap-2 mt-2">
                  <Link
                    href={`/admin/gestion/productos/${p.id}/edit`}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Editar
                  </Link>
                  <button className="text-red-500 hover:underline text-sm">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-4 py-2 text-sm rounded border ${num === page ? 'bg-pink-600 text-white' : 'bg-white hover:bg-gray-100'}`}
                >
                  {num}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
