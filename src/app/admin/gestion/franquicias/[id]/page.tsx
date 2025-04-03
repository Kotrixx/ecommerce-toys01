'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { API } from '@/lib/api'
import { Franquicia } from '@/types'
import fetchData from '@/lib/fetchData'

export default function EditarFranquicia() {
  const { id } = useParams() as { id: string }
  const router = useRouter()

  const [form, setForm] = useState<Franquicia>({
    id: '',
    name: '',
    status: 'activo',
  })

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Obtener datos
  useEffect(() => {
    const token = localStorage.getItem('token')
    const load = async () => {
      try {
        const data = await fetchData(API.FRANQUICIA_BY_ID(id), token || '')
        setForm({
          id: data.id,
          name: data.name,
          status: data.status,
        })
      } catch {
        setError('Error al cargar la franquicia.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  // Manejador de cambios
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const token = localStorage.getItem('token')

    try {
      const res = await fetch(API.FRANQUICIA_BY_ID(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          status: form.status,
        }),
      })

      if (res.ok) {
        router.push('/admin/gestion/franquicias')
      } else {
        setError('No se pudo actualizar la franquicia.')
      }
    } catch {
      setError('Error al actualizar la franquicia.')
    } finally {
      setLoading(false)
    }
  }

  // Vista
  if (loading) return <p className="text-center text-gray-600 py-6">Cargando...</p>
  if (error) return <p className="text-red-500 text-center">{error}</p>

  return (
    <div className="bg-white text-gray-900 shadow-md rounded p-6 max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Editar Franquicia</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-gray-800">Nombre</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-800">Estado</span>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </label>

        <button
          type="submit"
          className={`w-full ${loading ? 'bg-pink-300' : 'bg-pink-600 hover:bg-pink-700'} text-white py-2 rounded transition`}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  )
}
