// src/app/admin/gestion/marcas/page.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { API } from '@/lib/api'

type Marca = {
  id: string
  name: string
  status: 'activo' | 'inactivo'
}

export default function GestionMarcas() {
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMarcas = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(API.MARCAS_ALL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Error al cargar las marcas')
      const data = await res.json()
      setMarcas(data)
    } catch (err) {
      setError('No se pudieron cargar las marcas.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarcas()
  }, [])

  const handleEliminar = async (id: string) => {
    const token = localStorage.getItem('token')
    if (!confirm('¿Estás seguro de que quieres desactivar esta marca?')) return
    await fetch(API.MARCA_BY_ID(id), {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    fetchMarcas()
  }

  return (
    <div className="bg-gray-800 text-white p-6 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Marcas</h1>
        <Link
          href="/admin/gestion/marcas/new"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          + Nueva Marca
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Cargando marcas...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded text-sm">
          <thead className="bg-gray-700 text-left text-white">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Estado</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {marcas.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="p-3 text-gray-700">{m.name}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      m.status === 'activo'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-gray-400 text-gray-800'
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <Link
                    href={`/admin/marcas/${m.id}/edit`}
                    className="text-blue-500 hover:underline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleEliminar(m.id)}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
