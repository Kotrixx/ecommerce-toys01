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
  const [imagenes, setImagenes] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    const token = localStorage.getItem('token')
    const formData = new FormData()

    formData.append('name', form.nombre)
    formData.append('price', form.precio)
    formData.append('is_offer', (Number(form.oferta) > 0).toString())
    formData.append(
      'offer_price',
      Number(form.oferta) > 0
        ? (parseFloat(form.precio) * (1 - Number(form.oferta) / 100)).toFixed(2)
        : ''
    )
    imagenes.forEach((img) => formData.append('images', img))

    try {
      const res = await fetch('http://localhost:8000/v1.0/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/admin/gestion/productos')
        }, 1500)
      } else {
        const errorText = await res.text()
        throw new Error(errorText)
      }
    } catch (err) {
      console.error(err)
      setError('No se pudo crear el producto. Verifica los datos o la conexión.')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 4)
      setImagenes(selectedFiles)
    }
  }

  return (
    <div className="bg-white rounded p-6 max-w-2xl mx-auto mt-8 shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">Agregar producto</h1>

      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
          ✅ Producto creado exitosamente
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
          multiple
          className="w-full"
          onChange={handleImageChange}
          required
        />
        <p className="text-sm text-gray-500">Puedes subir hasta 4 imágenes.</p>

        {imagenes.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {imagenes.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt={`preview-${i}`}
                className="rounded object-cover h-32 w-full"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? 'bg-pink-300' : 'bg-pink-600 hover:bg-pink-700'
          } text-white px-4 py-2 rounded transition`}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  )
}