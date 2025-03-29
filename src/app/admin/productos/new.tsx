'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NuevoProducto() {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    oferta: '',
  })
  const [imagen, setImagen] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const formData = new FormData()
    Object.entries(form).forEach(([k, v]) => formData.append(k, v))
    if (imagen) formData.append('imagen', imagen)

    await fetch('http://localhost:8000/products', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })

    router.push('/admin/productos')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Agregar producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full px-4 py-2 border rounded"
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          className="w-full px-4 py-2 border rounded"
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Oferta (%)"
          className="w-full px-4 py-2 border rounded"
          onChange={(e) => setForm({ ...form, oferta: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => setImagen(e.target.files?.[0] || null)}
          required
        />
        <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition">
          Guardar
        </button>
      </form>
    </div>
  )
}
