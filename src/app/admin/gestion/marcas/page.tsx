'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { API } from '@/lib/api'
import { Marca } from '@/types' // Importa el tipo desde types

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Marcas</h1>
        <Link
          href="/admin/gestion/marcas/new"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          + Nueva Marca
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Cargando marcas...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg text-sm">
          <thead className="bg-gray-700 text-left">
            <tr>
              <th className="p-3 text-white">Nombre</th>
              <th className="p-3 text-white">Estado</th>
              <th className="p-3 text-right text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {marcas.map((m) => (
              <tr key={m.id} className="border-t border-gray-200">
                <td className="p-3 text-gray-700">{m.name}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      m.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {m.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <Link
                    href={`/admin/gestion/marcas/${m.id}/edit`}
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
