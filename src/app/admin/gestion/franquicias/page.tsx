'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { API } from '@/lib/api' // Importa las rutas desde api.ts

type Franquicia = {
  id: string
  name: string
  status: 'active' | 'inactive'
}

export default function GestionFranquicias() {
  const [franquicias, setFranquicias] = useState<Franquicia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFranquicias = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(API.FRANQUICIAS, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Error al cargar franquicias')
      const data = await res.json()
      setFranquicias(data)
    } catch (err) {
      setError('No se pudieron cargar las franquicias.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFranquicias()
  }, [])

  const handleEliminar = async (id: string) => {
    const token = localStorage.getItem('token')
    if (!confirm('¿Estás seguro de que quieres desactivar esta franquicia?')) return
    await fetch(API.FRANQUICIA_BY_ID(id), {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    fetchFranquicias()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Franquicias</h1>
        <Link
          href="/admin/gestion/franquicias/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Nueva Franquicia
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Cargando franquicias...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 text-gray-800">Nombre</th>
              <th className="p-3 text-gray-800">Estado</th>
              <th className="p-3 text-right text-gray-800">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {franquicias.map((f) => (
              <tr key={f.id} className="border-t border-gray-200">
                <td className="p-3 text-gray-700">{f.name}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${f.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {f.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <Link
                    href={`/admin/gestion/franquicias/${f.id}/`}
                    className="text-blue-600 hover:underline"
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
