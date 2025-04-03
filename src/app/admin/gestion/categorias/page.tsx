// src/app/admin/gestion/categorias/page.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { API } from '@/lib/api'
import fetchData from '@/lib/fetchData'
import { Categoria } from '@/types'

export default function GestionCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategorias = async () => {
    const token = localStorage.getItem('token')
    try {
      const data = await fetchData(API.CATEGORIAS_ALL, token || '')
      setCategorias(data)
    } catch (err) {
      setError('No se pudieron cargar las categorías.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Categorías</h1>
        <Link
          href="/admin/categorias/new"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          + Nueva Categoría
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Cargando categorías...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg text-sm">
          <thead className="bg-gray-700 text-left">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Estado</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3 text-gray-700">{c.name}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      c.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {c.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>

                </td>
                <td className="p-3 text-right space-x-2">
                  <Link
                    href={`/admin/gestion/categorias/${c.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
