'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { API } from '@/lib/api'

export default function EditarMarca() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    status: 'activo',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`${API.MARCA_BY_ID(id)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name,
          status: data.status,
        })
      })
      .catch(() => setError('Error al cargar la marca.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const token = localStorage.getItem('token')

    const payload = {
      name: form.name,
      status: form.status,
    }

    try {
      const res = await fetch(`${API.MARCA_BY_ID(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push('/admin/gestion/marcas')
      } else {
        setError('No se pudo actualizar la marca.')
      }
    } catch (err) {
      setError('Error al actualizar la marca.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p className="text-center py-6 text-gray-600">Cargando...</p>
  if (error) return <p className="text-red-500 text-center">{error}</p>

  return (
    <div className="bg-white text-gray-900 shadow-md rounded p-6 max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Editar Marca</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-800">Nombre</span>
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
          <span className="text-sm font-medium text-gray-800">Estado</span>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </label>

        <button
          type="submit"
          className={`w-full ${loading ? 'bg-blue-300' : 'bg-pink-600 hover:bg-pink-700'} text-white py-2 rounded transition`}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  )
}
