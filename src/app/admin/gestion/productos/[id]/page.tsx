'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { API } from '@/lib/api'

export default function EditarProducto() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    oferta: '',
    categoria: '',
    marca: '',
    estado: 'sellado',
    is_preventa: false,
    fecha_preventa: '',
  })

  const [imagenNueva, setImagenNueva] = useState<File | null>(null)
  const [categorias, setCategorias] = useState<string[]>([])
  const [marcas, setMarcas] = useState<string[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')

    // Cargar producto
    fetch(`${API.PRODUCTS}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({
          nombre: data.name,
          precio: data.price.toString(),
          imagen: data.images?.[0] || '',
          oferta:
            data.is_offer && data.offer_price
              ? Math.round((1 - data.offer_price / data.price) * 100).toString()
              : '0',
          categoria: data.category || '',
          marca: data.brand || '',
          estado: data.status === 'sellado' ? 'sellado' : 'no_sellado',
          is_preventa: data.is_preventa || false,
          fecha_preventa: data.fecha_preventa || '',
        })
      })
      .catch(() => setError('Error al cargar el producto.'))
      .finally(() => setLoading(false))

    // Cargar opciones
    fetch(API.FRANQUICIAS, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategorias(data.categorias || [])
        setMarcas(data.marcas || [])
      })
      .catch(console.error)
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    const formData = new FormData()
    formData.append('name', form.nombre)
    formData.append('price', form.precio)
    formData.append('category', form.categoria)
    formData.append('brand', form.marca)
    formData.append('status', form.estado)
    formData.append('is_offer', (Number(form.oferta) > 0).toString())
    formData.append(
      'offer_price',
      Number(form.oferta) > 0
        ? (
            parseFloat(form.precio) *
            (1 - Number(form.oferta) / 100)
          ).toFixed(2)
        : ''
    )
    formData.append('is_preventa', form.is_preventa.toString())
    if (form.is_preventa && form.fecha_preventa) {
      formData.append('fecha_preventa', form.fecha_preventa)
    }
    if (imagenNueva) formData.append('images', imagenNueva)

    const res = await fetch(`${API.PRODUCTS}/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })

    if (res.ok) {
      router.push('/admin/gestion/productos')
    } else {
      setError('No se pudo actualizar el producto.')
    }
  }

  if (loading) return <p className="text-center py-6 text-gray-600">Cargando...</p>
  if (error) return <p className="text-red-500 text-center">{error}</p>

  return (
    <div className="bg-white text-gray-900 shadow-md rounded p-6 max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">Editar Producto</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label>
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

        <label>
          <span className="text-sm font-medium">Precio</span>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </label>

        <label>
          <span className="text-sm font-medium">Descuento (%)</span>
          <input
            type="number"
            name="oferta"
            value={form.oferta}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </label>

        <label>
          <span className="text-sm font-medium">Categoría</span>
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded mt-1"
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="text-sm font-medium">Marca</span>
          <select
            name="marca"
            value={form.marca}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded mt-1"
          >
            <option value="">Seleccione una marca</option>
            {marcas.map((m, i) => (
              <option key={i} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="text-sm font-medium">Estado</span>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            <option value="sellado">Sellado</option>
            <option value="no_sellado">No sellado</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_preventa"
            checked={form.is_preventa}
            onChange={handleChange}
          />
          <span className="text-sm">¿Está en preventa?</span>
        </label>

        {form.is_preventa && (
          <label>
            <span className="text-sm font-medium">Fecha de preventa</span>
            <input
              type="date"
              name="fecha_preventa"
              value={form.fecha_preventa}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </label>
        )}

        {form.imagen && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Imagen actual:</p>
            <Image
              src={form.imagen}
              alt="Vista previa"
              width={200}
              height={200}
              className="rounded border"
            />
          </div>
        )}

        <label>
          <span className="text-sm font-medium">Imagen nueva (opcional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagenNueva(e.target.files?.[0] || null)}
            className="w-full mt-1"
          />
          <p className="text-sm text-gray-600 mt-1">Solo puedes subir una imagen.</p>
        </label>

        {imagenNueva && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(imagenNueva)}
              alt="preview"
              className="rounded object-cover h-40 w-full border"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded transition"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  )
}
