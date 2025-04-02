// src/app/admin/gestion/marcas/[id]/edit.tsx

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { API } from '@/lib/api'

export default function EditarMarca() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: '',
    estado: 'activo',
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
          nombre: data.name,
          estado: data.status,
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
      name: form.nombre,
      status: form.estado,
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
    <div className="bg-gray-800 text-white shadow-md rounded p-6 max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">Editar Marca</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Nombre</span>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Estado</span>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
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
